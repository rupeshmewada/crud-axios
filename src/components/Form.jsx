import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi'

export default function Form({ data, setData, updateDataApi, setUpdateDataApi }) {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    let isEmpty = Object.keys(updateDataApi).length === 0

    // get updated data and into input field
    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })
    }, [updateDataApi])

    // console.log('updateDataApi',updateDataApi);

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(name);
        // console.log(value);
        setAddData((prev) => {
            // console.log(prev);
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addPostData = async () => {
        const res = await postData(addData)
        // console.log('res ', res);

        if (res.status == 201) {
            setData([...data, res.data])
            setAddData({ title: '', body: '' })
        }

    }

    // updatePostData 
    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData)
            console.log(res);

            if (res.status === 200) {
                setData((prev) => {
                    // console.log(prev);
                    return prev.map((curElem) => {
                        return curElem.id === res.data.id ? res.data : curElem
                    })

                })
            }
            setAddData({ title: "", body: "" })
            setUpdateDataApi({})
            
        } catch (error) {

        }

    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const action = e.nativeEvent.submitter.value
        // console.log(action);
        if (action === 'ADD') {
            addPostData()
        } else if (action === 'Edit')
            updatePostData()
    }

    return (
        <>
            <div className="form">
                <form action="" onSubmit={handleFormSubmit}>

                    <input type="text" placeholder='add Title'
                        id='title'
                        name='title'
                        value={addData.title}
                        onChange={handleInputChange}
                    />

                    <input type="text" placeholder='add Post'
                        id='body'
                        name='body'
                        value={addData.body}
                        onChange={handleInputChange}
                    />
                    <button type='submit' value={isEmpty ? 'ADD' : 'Edit'}>{isEmpty ? 'ADD' : 'Edit'}</button>
                </form>

            </div>
        </>
    )
}
