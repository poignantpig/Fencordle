import pandas as pd
import json
import numpy as np

gsheetid = "142QYdsg1Ewsnr468CMXAJuyYeLE4jngecn3dLK8dhgQ"
sheet_name = "fencingNames"
gsheet_url = "https://docs.google.com/spreadsheets/d/{}/gviz/tq?tqx=out:csv&sheet={}".format(gsheetid, sheet_name)

data = {}
setup = {}
df = pd.read_csv(gsheet_url)
data["day"]= 0
data["answer"] = ""
dictionKeys = [x.lower() for x in df['name1'].to_list()]
for i in range(len(dictionKeys)):
    x = df.iloc[i].tolist()
    x.pop(0)
    x[3] = int(x[3])
    setup[dictionKeys[i]]=x
    data["players"] = setup
    
with open("fencers.json", "w") as fp:
    json.dump(data , fp) 