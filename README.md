# NodeSQL
Basic repo which connects to a SQL Azure instance using Node.

# Requirements
1.  SQL Server Resource
    (tests were done at the Standard service tier with 10 DTUs (S0) with 1GB of storage.)
    
2.  An Azure SQL database
    (with a server-level firewall rule for the public IP address of the computer you use)
    
3.  Node.js
    (this example was done on Windows)
    
4.  npm init -y

    npm install tedious
    
    npm install async
    
5.  Run code
  (node <FILENAME>.js)

# References
https://docs.microsoft.com/en-us/azure/sql-database/sql-database-get-started-portal

https://docs.microsoft.com/en-us/azure/sql-database/sql-database-connect-query-nodejs
