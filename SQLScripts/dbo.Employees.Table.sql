USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeID] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[TitleOfCourtesy] [nvarchar](50) NOT NULL,
	[BirthDate] [datetime2](7) NOT NULL,
	[HireDate] [datetime2](7) NOT NULL,
	[Address] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[Region] [nvarchar](50) NULL,
	[PostalCode] [nvarchar](50) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
	[HomePhone] [nvarchar](50) NOT NULL,
	[Extension] [int] NOT NULL,
	[Photo] [nvarchar](max) NOT NULL,
	[Notes] [nvarchar](450) NOT NULL,
	[ReportsTo] [int] NULL,
	[PhotoPath] [nvarchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
