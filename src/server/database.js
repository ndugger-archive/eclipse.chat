import MySQL from 'mysql';
import Promise from 'bluebird';

export default class Database
{
	constructor(database)
	{
		this.connection = MySQL.createConnection(
		{
			host: database.host,
			port: database.port,
			user: database.user,
			password: database.password,
			database: database.name
		});
	}

	find(table, n = 1000000, rules = 'id != null', order = 'id asc')
	{
		return new Promise((resolve, reject) =>
		{
			this.connection.query(`select * from ${table} limit ${n}`, (error, results) =>
			{
				if (error) throw error;
				else resolve(n === 1 ? results[0] : results);
			});
		});
	}

	create(table, entry)
	{
		return new Promise((resolve, reject) =>
		{
			let columns = (() => 
			{
				let columns = '';
				for (let key in entry)
				{
					columns += key + ', '
				}
				return columns.substring(0, columns.length - 2);
			})();
			let values = (() => 
			{
				let values = '';
				for (let key in entry)
				{
					let value = entry[key];
					if (typeof value === 'string')
					{
						values += `"${value}", `;
					}
					else
					{
						values += value + ', ';
					}
				}
				return values.substring(0, values.length - 2);
			})();
			this.connection.query(`insert into ${table} (${columns}) values (${values})`, (error, insert) =>
			{
				if (error)
				{
					throw error;
				}
				else
				{	
					entry.id = insert.insertId;
					resolve(entry);
				}
			});
		});
	}
}