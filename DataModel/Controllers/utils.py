import nexradaws

conn = nexradaws.NexradAwsInterface()

def download_data(radarData):
    try:
        downloads = conn.download(radarData, './data')
        
