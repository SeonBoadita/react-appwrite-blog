import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

const PostCard = ({ $id, title, featuredImage }) => {

    return (
        <div className='w-full' style={{ marginBottom: '1.5rem' }}>
            <Link to={`/post/${$id}`}>
                <div className='w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'>
                    <div className='w-full h-48 overflow-hidden bg-gray-100'>
                        <img 
                            src={service.getFile(featuredImage)} 
                            alt={title}
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        />
                    </div>
                    <div className='text-gray-900 font-medium text-lg' style={{ padding: '1rem' }}>
                        {title}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCard
