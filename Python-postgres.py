import psycopg2 
import csv


# c = []
# with open('Volkswagen (16).csv','r')as f:
#   data = list(csv.reader(f))
#   c  = data
 

# for i,row in enumerate(c):
# 	row.insert(0,i)


	
# with open('Volkswagen.csv','w')as e:
#   d = csv.writer(e)
#   for row in c:
#         d.writerow(row)
	
# import pandas as pd
# df = pd.read_csv('Volkswagen.csv')
# df.dropna(axis=0, how='all',inplace=True)
# df.to_csv('Volkswagen.csv', index=False)



#--------------------------------------------------------------------------------------------------
# import pandas as pd
# df = pd.read_csv("Volkswagen.csv", encoding = "ISO-8859-1")
# print(len(df.keys()))

  
conn = psycopg2.connect(
            database="Cube", 
            user = "postgres", 
            password = "Admin123", 
            host = "localhost", 
            port = "5432")

cur = conn.cursor()
with open('Volkswagen.csv','r')as f:
	next(f)
	data = csv.reader(f)
	for row in data:
	
		cur.execute('INSERT INTO Volkswagen VALUES(%s, %s, %s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', 
                                    (row[0], row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13],row[14],row[15],row[16],row[17],row[18],row[19],row[20],row[21],row[22],row[23],row[24],row[25],row[26],row[27],row[28],row[29],row[30],row[31],row[32]))
											  
	# cur.copy_expert(copy Volkswagen from stdin(format csv), 'Volkswagen.csv', sep=',')
conn.commit()   
print('done')                                         