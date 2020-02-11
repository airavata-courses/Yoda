import json
import sys
from kafka import KafkaConsumer, KafkaProducer
import pickle
import nexradaws
import numpy as np
import matplotlib.pyplot as plt
from metpy.cbook import get_test_data
from metpy.io import Level2File
from metpy.plots import add_timestamp, ctables
from mpl_toolkits.axes_grid1 import make_axes_locatable
from PIL import Image
import glob
from base64 import b64encode
import io
import pymongo
import datetime

mongoClient = pymongo.MongoClient("mongodb://teamyoda:teamyoda123@cluster0-shard-00-00-kooeu.mongodb.net:27017,cluster0-shard-00-01-kooeu.mongodb.net:27017,cluster0-shard-00-02-kooeu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
conn = nexradaws.NexradAwsInterface()

def databaseSetup():
    dbList = mongoClient.list_database_names()
    myDB = mongoClient['sessionManagement']
    if myDB in dbList:
        if 'ActivityDetail' not in myDB.list_collection_names():
            myCol = myDB['ActivityDetail']

    return myDB['ActivityDetail']

def payload_create(files): 
    downloaded_data = conn.download(files['availData'], '.\data')
    collection = databaseSetup()
    for idx, localnexradfile in enumerate(downloaded_data.iter_success(), start=1):
        # open the file
        name = localnexradfile.open()
        f = Level2File(name)

        sweep = 0
        # First item in ray is header, which has azimuth angle
        az = np.array([ray[0].az_angle for ray in f.sweeps[sweep]])

        ref_hdr = f.sweeps[sweep][0][4][b'REF'][0]
        ref_range = np.arange(ref_hdr.num_gates) * ref_hdr.gate_width + ref_hdr.first_gate
        ref = np.array([ray[4][b'REF'][1] for ray in f.sweeps[sweep]])

        rho_hdr = f.sweeps[sweep][0][4][b'RHO'][0]
        rho_range = (np.arange(rho_hdr.num_gates + 1) - 0.5) * rho_hdr.gate_width + rho_hdr.first_gate
        rho = np.array([ray[4][b'RHO'][1] for ray in f.sweeps[sweep]])

        phi_hdr = f.sweeps[sweep][0][4][b'PHI'][0]
        phi_range = (np.arange(phi_hdr.num_gates + 1) - 0.5) * phi_hdr.gate_width + phi_hdr.first_gate
        phi = np.array([ray[4][b'PHI'][1] for ray in f.sweeps[sweep]])

        zdr_hdr = f.sweeps[sweep][0][4][b'ZDR'][0]
        zdr_range = (np.arange(zdr_hdr.num_gates + 1) - 0.5) * zdr_hdr.gate_width + zdr_hdr.first_gate
        zdr = np.array([ray[4][b'ZDR'][1] for ray in f.sweeps[sweep]])

        # Get the NWS reflectivity colortable from MetPy
        ref_norm, ref_cmap = ctables.registry.get_with_steps('NWSReflectivity', 5, 5)

        # Plot the data!
        fig, axes = plt.subplots(2, 2, figsize=(15, 15))
        for var_data, var_range, colors, lbl, ax in zip((ref, rho, zdr, phi),
                                                        (ref_range, rho_range, zdr_range, phi_range),
                                                        (ref_cmap, 'plasma', 'viridis', 'viridis'),
                                                        ('REF (dBZ)', 'RHO', 'ZDR (dBZ)', 'PHI'),
                                                        axes.flatten()):
            # Turn into an array, then mask
            data = np.ma.array(var_data)
            data[np.isnan(data)] = np.ma.masked

            # Convert az,range to x,y
            xlocs = var_range * np.sin(np.deg2rad(az[:, np.newaxis]))
            ylocs = var_range * np.cos(np.deg2rad(az[:, np.newaxis]))

            # Define norm for reflectivity
            norm = ref_norm if colors == ref_cmap else None

            # Plot the data
            a = ax.pcolormesh(xlocs, ylocs, data, cmap=colors, norm=norm)

            divider = make_axes_locatable(ax)
            cax = divider.append_axes('right', size='5%', pad=0.05)
            fig.colorbar(a, cax=cax, orientation='vertical', label=lbl)

            ax.set_aspect('equal', 'datalim')
            ax.set_xlim(-100, 100)
            ax.set_ylim(-100, 100)
            add_timestamp(ax, f.dt, y=0.02, high_contrast=False)
        plt.suptitle('Level 2 Data', fontsize=20)
        plt.tight_layout()
        # plt.show()
        plt.savefig('images/'+str(idx)+'.png')
    imageList = []
    images = glob.glob("images/*.png")
    for image in images:
        img = Image.open(image)
        # data = np.array(img, dtype='uint8')
        # imageList.append(data.tolist())
        b64img = b64encode(img.tobytes()).decode('utf8')
        imageList.append(b64img)

    payload = {}
    payload['sessionId'] = files['session_id']
    payload['radar'] = files['radar']
    payload['day'] = files['day']
    payload['month'] = files['month']
    payload['year'] = files['year']
    payload['image'] = imageList[0]
    payload['createdDate'] = str(datetime.datetime.utcnow())
    collection.insert_one(payload)

    response = {}
    response['userId'] = files['user_id']
    response['sessionId'] = files['session_id']

    return response