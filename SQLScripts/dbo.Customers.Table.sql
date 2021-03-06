USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerID] [nvarchar](50) NOT NULL,
	[CompanyName] [nvarchar](50) NOT NULL,
	[ContactName] [nvarchar](50) NOT NULL,
	[ContactTitle] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[Region] [nvarchar](50) NULL,
	[PostalCode] [nvarchar](50) NULL,
	[Country] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NOT NULL,
	[Fax] [nvarchar](50) NULL
) ON [PRIMARY]
GO
