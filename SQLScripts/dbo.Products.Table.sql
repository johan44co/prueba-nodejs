USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductID] [nvarchar](50) NOT NULL,
	[ProductName] [nvarchar](50) NOT NULL,
	[SupplierID] [nvarchar](50) NOT NULL,
	[CategoryID] [nvarchar](50) NOT NULL,
	[QuantityPerUnit] [nvarchar](50) NOT NULL,
	[UnitPrice] [float] NOT NULL,
	[UnitsInStock] [nvarchar](50) NOT NULL,
	[UnitsOnOrder] [nvarchar](50) NOT NULL,
	[ReorderLevel] [nvarchar](50) NOT NULL,
	[Discontinued] [bit] NOT NULL
) ON [PRIMARY]
GO
