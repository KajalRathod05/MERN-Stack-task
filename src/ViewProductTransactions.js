import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

function ViewProductTransactions({ onMonthChange }) {

    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const getTransactions = () => {
        axios.get("http://localhost:5000/transaction")
            .then(res => {
                if (res.status === 200) {
                    setTransactions(res.data);
                    setFilteredTransactions(res.data);
                }
            }).catch(() => alert("Something wents wrong..!"))
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'Image',
            selector: row => <img width={90} height={90} src={row.image} alt='not found' />
        },
        {
            name: 'Sold',
            selector: row => row.sold ? "True" : "False"
        },
        {
            name: 'DateOfSale',
            selector: row => new Date(row.dateOfSale).toLocaleDateString()
        }
    ]

    useEffect(() => {
        getTransactions();
    }, []);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const [month, setMonth] = useState("March")
    const [selectedMonth, setSelectedMonth] = useState("March");

    const handleChange = (e) => {
        setSelectedMonth(e.target.value);
        setMonth(e.target.value);
        onMonthChange(e.target.value);
    };

    useEffect(() => {
        const result = transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).toLocaleString("default", { month: "long" });

            return (
                transactionMonth === month &&
                (transaction.title.includes(search) ||
                    transaction.description.includes(search) ||
                    transaction.price.toString().includes(search))
            );
        });
        setFilteredTransactions(result);
    }, [search, month, transactions]);

    return (
        <div className='p-2'>
            <DataTable
                columns={columns}
                data={filteredTransactions}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='500px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='col-md-4'>
                        <input type='text'
                            placeholder='Search Transaction'
                            className='form-control border-primary'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} /> 
                        </div>

                       <span style={{ marginRight: 700 }}>&nbsp;</span>

                        <div className='col-md-4'>
                        <select className='form-select'  value={selectedMonth} onChange={handleChange}>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>
                }
                subHeaderAlign='left'
            />
        </div>
    );
}

export default ViewProductTransactions;