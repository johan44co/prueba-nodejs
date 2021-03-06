USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] NOT NULL,
	[CustomerID] [nvarchar](50) NOT NULL,
	[EmployeeID] [nvarchar](50) NOT NULL,
	[OrderDate] [datetime2](7) NOT NULL,
	[RequiredDate] [datetime2](7) NOT NULL,
	[ShippedDate] [datetime2](7) NULL,
	[ShipVia] [nvarchar](50) NOT NULL,
	[Freight] [float] NOT NULL,
	[ShipName] [nvarchar](50) NOT NULL,
	[ShipAddress] [nvarchar](50) NOT NULL,
	[ShipCity] [nvarchar](50) NOT NULL,
	[ShipRegion] [nvarchar](50) NULL,
	[ShipPostalCode] [nvarchar](50) NULL,
	[ShipCountry] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
