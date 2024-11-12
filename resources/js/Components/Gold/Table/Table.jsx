
import ButtonLoader from '@/Components/UI/ButtonLoader';
import { useThemeTab } from '@/context/ThemeTabContext';
import { formatDate } from '@/lib/formatDate';
import React, { useEffect, useState } from 'react'

const Table = () => {
    const { ExchangeRates, isLoading } = useThemeTab();
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [visibleData, setVisibleData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const rowsPerPage = 10;

    useEffect(() => {
        if (ExchangeRates) {
            setAllData(ExchangeRates?.data);
            setPage(2);
            loadInitialData(ExchangeRates?.data);
        }
    }, [ExchangeRates]);

    const loadInitialData = (data) => {
        const initialData = data.slice(0, rowsPerPage);
        setVisibleData(initialData);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        const filtered = allData.filter((item) =>
            item.ShortName.toLowerCase().includes(query.toLowerCase()) ||
            item.FullName.toLowerCase().includes(query.toLowerCase())
        );
        setPage(1);
        setVisibleData(filtered.slice(0, rowsPerPage));
    };

    // const filteredData = ExchangeRates?.data?.filter((item) =>
    //     item.ShortName.toLowerCase().includes(search.toLowerCase()) ||
    //     item.FullName.toLowerCase().includes(search.toLowerCase())
    // );

    const filteredData = allData.filter((item) =>
        item.ShortName.toLowerCase().includes(search.toLowerCase()) ||
        item.FullName.toLowerCase().includes(search.toLowerCase())
    );
    const handleLoadMore = () => {
        if (filteredData) {
            setLoading(true);
            setTimeout(() => {
                const startIndex = (page - 1) * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                setVisibleData(prevData => [
                    ...prevData,
                    ...filteredData.slice(startIndex, endIndex)
                ]);
                setPage(prevPage => prevPage + 1);
                setLoading(false);
            }, 2000);
        }
    };

    if (isLoading) return <h1>tahaa</h1>
    return (
        <>
            <table className="table ">
            <thead>
                <tr>
                    <th scope="col">
                        <input type="text" placeholder='Search for Gold' onChange={handleSearch} />
                    </th>
                    <th scope="col">Latest Price</th>
                    <th scope="col">Buying</th>
                    <th scope="col">Selling</th>
                    <th scope="col">Change</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody>
                    {visibleData?.length > 0 ? visibleData?.map((item, index) => (
                    <tr
                        key={index}
                    // className={
                    //     item.changeRate > 0 ? 'table-success-bg' :
                    //         item.changeRate < 0 ? 'table-danger-bg' : ''
                    // }
                    >
                        {/* <th scope="row">
                            {item.changeRate > 0 ? (
                                <i className="fa-solid fa-arrow-up-long"></i>
                            ) : item.changeRate < 0 ? (
                                <i className="fa-solid fa-arrow-down-long"></i>
                            ) : (
                                <i className="fa-solid fa-minus"></i>
                            )}
                        </th> */}
                        <td className="content-tab">
                            <span className="coin-bg"></span>
                            <span>
                                <h4 className='black-bg-head'>{item?.FullName}</h4>
                            </span>
                        </td>
                        <td>{item?.latest.toFixed(2)}</td>
                        <td>{item?.buying.toFixed(2)}</td>
                        <td>{item?.selling.toFixed(2)}</td>
                        <td
                            style={{
                                color: item.changeRate >= 0 ? 'green' : item.changeRate < 0 ? 'red' : '',
                                fontWeight: 'bold'
                            }}
                        >{(item.changeRate).toFixed(2)}%</td>
                        <td>{formatDate(item.lastupdate)}</td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="6">No data found</td>
                    </tr>
                )}
            </tbody>
        </table>
            {filteredData?.length > visibleData?.length && (
                <div className="flex flex-col items-center my-5">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 text-white bg-gray-800 border-none rounded cursor-pointer hover:bg-gray-700"
                    >
                        {loading ? <ButtonLoader /> : "Load More"}

                    </button>
                </div>
            )}
        </>

    )
}

export default Table
