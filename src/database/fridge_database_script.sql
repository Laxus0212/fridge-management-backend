create or replace table Chats
(
    chatId    int auto_increment
        primary key,
    familyId  int      null,
    createdAt datetime not null,
    updatedAt datetime not null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table Families
(
    familyId   int auto_increment
        primary key,
    familyName varchar(100) not null,
    createdAt  datetime     not null,
    updatedAt  datetime     not null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table Fridges
(
    fridgeId   int auto_increment
        primary key,
    fridgeName varchar(255) null,
    ownerId    int          null,
    familyId   int          null,
    createdAt  datetime     not null,
    updatedAt  datetime     not null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table Messages
(
    messageId varchar(255) not null
        primary key,
    chatId    int          null,
    senderId  int          null,
    message   varchar(255) null,
    sentAt    datetime     null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    username  varchar(255) null,
    familyId  int          null,
    constraint messages_ibfk_1
        foreign key (chatId) references Chats (chatId)
            on update cascade
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace index chatId
    on Messages (chatId);

create or replace table Recipes
(
    id           int auto_increment
        primary key,
    title        varchar(255)                          null,
    ingredients  text                                  not null,
    instructions text                                  null,
    description  text                                  not null,
    savedBy      int                                   null,
    familyId     int                                   null,
    mealType     enum ('breakfast', 'lunch', 'dinner') null,
    createdAt    datetime                              not null,
    updatedAt    datetime                              not null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table SequelizeMeta
(
    name varchar(255) not null
        primary key,
    constraint name
        unique (name)
)
    collate = utf8mb3_unicode_ci;

create or replace table Shelves
(
    shelfId   int auto_increment
        primary key,
    shelfName varchar(255) null,
    fridgeId  int          null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    constraint shelves_ibfk_1
        foreign key (fridgeId) references Fridges (fridgeId)
            on update cascade on delete cascade
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table Products
(
    productId      int auto_increment
        primary key,
    productName    varchar(255)                                    null,
    quantity       int                                             null,
    unit           enum ('kg', 'g', 'l', 'ml', 'pcs', 'dkg', 'dl') null,
    expirationDate date                                            null,
    opened_date    date                                            null,
    shelfId        int                                             null,
    createdAt      datetime                                        not null,
    updatedAt      datetime                                        not null,
    constraint products_ibfk_1
        foreign key (shelfId) references Shelves (shelfId)
            on update cascade on delete cascade
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace index shelfId
    on Products (shelfId);

create or replace index fridgeId
    on Shelves (fridgeId);

create or replace table ShoppingLists
(
    listId    int auto_increment
        primary key,
    name      varchar(255) null,
    ownerId   int          null,
    familyId  int          null,
    createdAt datetime     not null,
    updatedAt datetime     not null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table ShoppingListItems
(
    itemId         int auto_increment
        primary key,
    productName    varchar(255)                                    null,
    quantity       decimal(10, 2)                                  null,
    unit           enum ('g', 'kg', 'ml', 'l', 'pcs', 'dkg', 'dl') null,
    shoppingListId int                                             null,
    createdAt      datetime                                        not null,
    updatedAt      datetime                                        not null,
    constraint shoppinglistitems_ibfk_1
        foreign key (shoppingListId) references ShoppingLists (listId)
            on update cascade on delete cascade
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace index shoppingListId
    on ShoppingListItems (shoppingListId);

create or replace table Users
(
    userId    int auto_increment
        primary key,
    email     varchar(255)                         null,
    username  varchar(255)                         null,
    password  varchar(255)                         null,
    familyId  int                                  null,
    createdAt datetime default current_timestamp() null,
    updatedAt datetime default current_timestamp() null,
    constraint email
        unique (email),
    constraint users_ibfk_1
        foreign key (familyId) references Families (familyId)
            on update cascade on delete set null
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace table Invitations
(
    invitationId  int auto_increment
        primary key,
    familyId      int                            null,
    invitedUserId int                            null,
    status        varchar(255) default 'pending' null,
    createdAt     datetime                       not null,
    updatedAt     datetime                       not null,
    constraint invitations_ibfk_1
        foreign key (familyId) references Families (familyId)
            on update cascade,
    constraint invitations_ibfk_2
        foreign key (invitedUserId) references Users (userId)
            on update cascade
)
    collate = utf8mb4_uca1400_ai_ci;

create or replace index familyId
    on Invitations (familyId);

create or replace index invitedUserId
    on Invitations (invitedUserId);

create or replace index familyId
    on Users (familyId);


