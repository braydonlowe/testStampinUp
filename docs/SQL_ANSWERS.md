# SQL Answers

## Failed Orders in the Last 30 Days

Given an Orders table with columns OrderId, CustomerId, OrderDate, Status, and Total, write a query to find all orders placed in the last 30 days with a status of 'Failed'.

```sql
SELECT *
FROM Orders
WHERE Status = 'Failed'
AND OrderDate >= CURRENT_DATE - INTERVAL '30 days';
```

## High-Value Orders with Customer Info

Given a Customers table (CustomerId, Name, Email) and the Orders table above, write a query that returns the customer name, email, and order total for all orders over $100.

```sql
SELECT c.Name, c.Email, o.Total
FROM Customers c
JOIN Orders o ON c.CustomerId = o.CustomerId
WHERE o.Total > 100;
```

## Order Count Per Customer Including Zero Orders

Using the same tables, write a query that returns how many orders each customer has placed. Include customers who have placed zero orders.

```sql
SELECT c.Name, COUNT(o.OrderId) as OrderCount
FROM Customers c
LEFT JOIN Orders o ON c.CustomerId = o.CustomerId
GROUP BY c.CustomerId, c.Name;
```

## What's Wrong:

```Question
Here's a query that's supposed to return all customers who have never placed an order, but it's returning zero rows even though we know some exist. What's wrong?

SELECT c.Name, c.Email
FROM Customers c
LEFT JOIN Orders o ON c.CustomerId = o.CustomerId
WHERE o.Status = 'Completed';
```

There seems to be a logical error in the SQL statement.

LEFT JOIN Orders o on o.CustomerId = o.CustomerId
WHERE o.Status = 'Completed' <- This does not make sense.

For customers who have never placed an order should have a NULL value for o.Status.

So the left join that is done earlier in the query doesn't even do anything.
