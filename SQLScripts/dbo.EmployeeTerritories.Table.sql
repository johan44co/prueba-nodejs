USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[EmployeeTerritories]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeTerritories](
	[EmployeeID] [nvarchar](50) NOT NULL,
	[TerritoryID] [int] NOT NULL
) ON [PRIMARY]
GO
