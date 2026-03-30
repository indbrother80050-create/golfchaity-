-- SQL Server Table Creation Script for Golf Charity Pro
-- Use this if you prefer manual setup over Prisma migrations.

-- Create Users Table
CREATE TABLE [User] (
    [id] NVARCHAR(450) NOT NULL PRIMARY KEY,
    [email] NVARCHAR(450) NOT NULL UNIQUE,
    [password] NVARCHAR(max) NOT NULL,
    [name] NVARCHAR(max) NOT NULL,
    [role] NVARCHAR(max) NOT NULL DEFAULT 'USER',
    [subscriptionStatus] NVARCHAR(max) NOT NULL DEFAULT 'INACTIVE',
    [stripeCustomerId] NVARCHAR(max),
    [createdAt] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updatedAt] DATETIME2 NOT NULL
);

-- Create Scores Table
CREATE TABLE [Score] (
    [id] NVARCHAR(450) NOT NULL PRIMARY KEY,
    [value] INT NOT NULL,
    [date] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [userId] NVARCHAR(450) NOT NULL,
    CONSTRAINT [Score_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [User] ([id]) ON DELETE CASCADE
);

-- Create Charities Table
CREATE TABLE [Charity] (
    [id] NVARCHAR(450) NOT NULL PRIMARY KEY,
    [name] NVARCHAR(max) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [logoUrl] NVARCHAR(max),
    [websiteUrl] NVARCHAR(max),
    [totalRaised] FLOAT NOT NULL DEFAULT 0
);

-- Create Draws Table
CREATE TABLE [Draw] (
    [id] NVARCHAR(450) NOT NULL PRIMARY KEY,
    [month] INT NOT NULL,
    [year] INT NOT NULL,
    [winningNumber] INT,
    [status] NVARCHAR(max) NOT NULL DEFAULT 'PENDING',
    [createdAt] DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- Create Subscriptions Table
CREATE TABLE [Subscription] (
    [id] NVARCHAR(450) NOT NULL PRIMARY KEY,
    [userId] NVARCHAR(450) NOT NULL UNIQUE,
    [charityId] NVARCHAR(450) NOT NULL,
    [amount] FLOAT NOT NULL,
    [status] NVARCHAR(max) NOT NULL DEFAULT 'ACTIVE',
    [startDate] DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [Subscription_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [User] ([id]) ON DELETE CASCADE,
    CONSTRAINT [Subscription_charityId_fkey] FOREIGN KEY ([charityId]) REFERENCES [Charity] ([id]) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX [Score_userId_idx] ON [Score] ([userId]);
CREATE INDEX [Subscription_charityId_idx] ON [Subscription] ([charityId]);
