USE [prueba-nodejs]
GO
/****** Object:  Table [dbo].[Region]    Script Date: 19/08/2021 8:44:31 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Region](
	[RegionID] [nvarchar](50) NOT NULL,
	[RegionDescription] [nvarchar](100) NOT NULL
) ON [PRIMARY]
GO
