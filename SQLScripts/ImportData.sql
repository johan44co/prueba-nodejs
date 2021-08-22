BULK INSERT Territories
FROM 'D:\Documents\projects\prueba-nodejs\assets\data\Territories.csv'
WITH (
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',
	ROWTERMINATOR='\r\n'
)