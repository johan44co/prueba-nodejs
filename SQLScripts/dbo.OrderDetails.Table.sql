USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderID] [int] NOT NULL,
	[ProductID] [nvarchar](50) NOT NULL,
	[UnitPrice] [float] NOT NULL,
	[Quantity] [nvarchar](50) NOT NULL,
	[Discount] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
