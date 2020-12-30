# prison

### A NoSQL database modeling a prison

This project is a study in why NoSQL is not the right choice for relational data.

I had never used MongoDB before, nor had I ever used JavaScript to any great degree. I was feeling chapped by the restrictions and complexities of SQL, which I was learning in my databases class at the time. I thought that NoSQL would make my project simpler, and that I would be laughing at my classmates constructing relationships in MySQL Workbench.

That might have been true, had I chosen a different sort of data to model. This prison, however, required relationships. I would have to squeeze them in, one way or another.

So I did. Messily. Horribly.

In order for the relational transactions to complete, I had to force normally asynchronous API endpoints to be completely synchronous. async/await keywords proliferated. Promises were nested inside of promises inside of promises. It worked, remarkably, but I paid an awful price for my kludge.

If I were to do this project again, I would do one of two things: 1) switch to a SQL database and use them to their fullest advantage, or 2) find some way to re-arrange the entire schema into one table. Probably, I would take option one.

MongoDB does really well with tables that do not interact much with one another. This allows for asynchronous operations to just do their job without being disturbed, and you get the advantages of the "schemaless" structure. Try to squeeze it into the shape of a SQL database, and you will only experience the pain of a round peg in a square hole.
