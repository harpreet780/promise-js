import React, { useEffect, useState } from 'react';
import { userData } from '../api';
import axios from 'axios';

const Home = () => {
    const [user, setUser] = useState([]);
    const [axiosFormData, setAxiosFormData] = useState([]);
    const apiUrl = userData();
    // with fetch
    const fetchData = () => {
        new Promise((resolve, reject) => {
            fetch(apiUrl).then(r => r.json()).then((response) => {
                setUser(response.data);
            }).catch(error => {
                reject(Error("this api's data is not valid"))
            })
        });
    }
    // with axios
    const axiosFetchData = () => {
        new Promise((resolve, reject) => {
            axios.get(apiUrl).then((response) => {
                setAxiosFormData(response.data.data);
            }).catch(error => {
                reject(Error("Found Error"))
            })
        });
    }

    useEffect(() => {
        fetchData()
        axiosFetchData()
    }, [])

    return (
        <div>
            {/* with simple fetch */}
            <div className='d-flex justify-content-center flex-wrap mt-5'>
                {user?.map((i) => {
                    return (
                        <div className="m-2">
                            <h5>{i.first_name}</h5>
                            <p>{i.email}</p>
                            <div className='m-auto' style={{ width: 200, height: 200 }}>
                                <img src={i.avatar} className="w-100 h-100" />
                            </div>
                        </div>
                    )
                })
                }
            </div>
            {/* with simple fetch */}
            <div className='d-flex justify-content-center flex-wrap mt-5'>
                {axiosFormData?.map((item) => {
                    return (
                        <div className="m-2">
                            <h5>{item.first_name}</h5>
                            <div className='m-auto' style={{ width: 100, height: 100 }}>
                                <img src={item.avatar} className="w-100 h-100" />
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Home;