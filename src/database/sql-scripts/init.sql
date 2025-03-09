-- Grant external access to varadi user
GRANT ALL PRIVILEGES ON fridge_database.* TO 'varadi'@'%';
FLUSH PRIVILEGES;

-- Grant external access to root user
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
