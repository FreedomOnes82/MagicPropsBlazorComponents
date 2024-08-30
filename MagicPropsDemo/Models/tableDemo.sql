IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'demojc')
BEGIN
    CREATE DATABASE demojc;
END

USE demojc;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'Goods')
BEGIN
CREATE TABLE [dbo].[Goods](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Category] [varchar](255) NULL,
	[SubCategory] [varchar](255) NULL,
	[Name] [varchar](255) NULL,
	[Price] [decimal](18, 0) NULL,
	[IsActive] [bit] NULL,
	[Count] [int] NULL,
	[IsDiscount] [bit] NULL,
	[Discount] [decimal](18, 0) NULL,
	[CreateDate] [datetime] NULL,
	[LastModifiedDate] [datetime] NULL,
	[CreateBy] [varchar](255) NULL,
	[LastModifiedBy] [varchar](255) NULL,
 CONSTRAINT [PK_Goods] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

INSERT INTO Goods(Category,SubCategory,Name)
VALUES('Electronics','Phone','HuaweiA'),
('Electronics','Phone','HuaweiB'),
('Electronics','Phone','HuaweiC'),
('Electronics','Phone','HuaweiD'),
('Electronics','Phone','IPhoneA'),
('Electronics','Phone','IPhoneB'),
('Electronics','Phone','IPhoneC'),
('Electronics','Phone','IPhoneD'),
('Electronics','Phone','SamsungA'),
('Electronics','Phone','SamsungB'),
('Electronics','Phone','SamsungC'),
('Electronics','Phone','SamsungD'),
('Electronics','Phone','SamsungE')
INSERT INTO Goods(Category,SubCategory,Name)
VALUES('Clothing','Tops','T-ShirtA'),
('Clothing','Tops','T-ShirtB'),
('Clothing','Tops','T-ShirtC'),
('Clothing','Tops','T-ShirtD'),
('Clothing','Tops','JacketA'),
('Clothing','Tops','JacketB'),
('Clothing','Tops','JacketC'),
('Clothing','Bottoms','PantsA'),
('Clothing','Bottoms','PantsB'),
('Clothing','Bottoms','PantsC'),
('Clothing','Bottoms','PantsD'),
('Clothing','Bottoms','ShortsA'),
('Clothing','Bottoms','ShortsB'),
('Clothing','Bottoms','ShortsC'),
('Clothing','Bottoms','ShortsD'),
('Clothing','Bottoms','ShortsE'),
('Clothing','Dress','DressA'),
('Clothing','Dress','DressB'),
('Clothing','Dress','DressC'),
('Clothing','Dress','DressD'),
('Clothing','Dress','Dress')

INSERT INTO Goods(Category,SubCategory,Name)
VALUES('Electronics','Laptop','ThinkPadA'),
('Electronics','Laptop','ThinkPadB'),
('Electronics','Laptop','ThinkPadC'),
('Electronics','Laptop','ThinkPadD'),
('Electronics','Laptop','AsusA'),
('Electronics','Laptop','AsusB'),
('Electronics','Laptop','AsusC'),
('Electronics','Laptop','AsusD'),
('Electronics','Laptop','MacbookA'),
('Electronics','Laptop','MacbookB'),
('Electronics','Laptop','MacbookC'),
('Electronics','Laptop','MacbookD'),
('Electronics','Laptop','MacbookE')

update Goods
set Price=ID*10,Discount=ID,Count=ID*5-3,CreateDate=DATEADD(DAY,-ID,GETDATE()),LastModifiedDate=DATEADD(DAY,13,CreateDate),IsActive=0

update Goods
set LastModifiedDate=DATEADD(DAY,13,CreateDate)

update Goods
set IsActive=1 where ID>10 and ID<=25
update Goods
set IsDiscount=1
update Goods
set IsDiscount=0 where ID%3=1

update Goods
set CreateBy='AdminA' where ID<=25
update Goods
set CreateBy='AdminB' where ID>25
update Goods
set LastModifiedBy='AdminC' where ID<=15
update Goods
set LastModifiedBy='AdminB' where ID>15 and ID<=30
update Goods
set LastModifiedBy='AdminA' where ID>30

END
GO

