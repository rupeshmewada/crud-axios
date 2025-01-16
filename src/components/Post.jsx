import React, { useState, useEffect } from 'react'
import { getPost, deletePost, postData } from '../api/PostApi'
import Form from './Form';
import '../App.css'

export default function Post() {

    const [data, setData] = useState([])
    const [updateDataApi, setUpdateDataApi] = useState({})
    // console.log("updateDataApi = ",updateDataApi);

    const getPostData = async () => {
        const res = await getPost()
        setData(res.data)
    }

    useEffect(() => {
        getPostData()
    }, [])

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                const newUpdatedPost = data.filter((curEle) => {
                    return curEle.id != id
                })
                // console.log(newUpdatedPost[0].title);
                setData(newUpdatedPost)
            }
            else {
                console.log("failed to delete ", res.status);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleUpdatePost = (curEle) => {
        // console.log(curEle);
        setUpdateDataApi(curEle)
    }

    return (
        <>
            <section>

                <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />

            </section>
            <section className='section-post'>

                <ul className='card'>
                    {
                        data.map((curEle) => {
                            const { id, userId, title, body } = curEle

                            return (
                                <>
                                    <li key={id}>
                                        <p>{id}</p>
                                        <p>{title}</p>
                                        <p>{body}</p>
                                        <button className='btn1' onClick={() => handleUpdatePost(curEle)}>Edit</button>
                                        
                                        <button className='btn2' onClick={() => handleDeletePost(id)}>Delete</button>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul >
            </section>
        </>
    )
}
