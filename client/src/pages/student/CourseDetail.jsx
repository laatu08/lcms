import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    const purchaseCourse=true
  return (
    <div className='mt-24 space-y-5'>
      <div className="bg-[#2D2F31] text-white ">
        <div className='max-w-7xl mx-auto py-8 px-4 flex flex-col gap-2'>
            <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
            <p className='text-base md:text-lg'>Course SubTitle</p>
            <p>Created by{"   "} <span className='text-[#C0C4FC] underline italic '>Boss</span></p>

            <div className='flex items-center gap-2 text-sm'>
                <BadgeInfo size={16}></BadgeInfo>
                <p>Last updated 11-11-1111</p>
            </div>

            <p>Student enrolled: 1001100010</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
            <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias voluptatem obcaecati assumenda tenetur temporibus, nobis quidem eum quae voluptatum aspernatur ab in, facilis architecto voluptas? Nobis sapiente dolorem, nesciunt iusto illo quas dolores commodi repellat dolorum? Eligendi unde facere accusantium.l</p>

            <Card>
                <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                        4 lecture
                    </CardDescription>
                </CardHeader>

                <CardContent className='space-y-3'>
                    {
                        [1,2,3].map((lecture,idx)=>(
                            <div key={idx} className='flex items-center gap-3 text-sm'>
                                <span>
                                    {
                                        false ? (<PlayCircle size={14}></PlayCircle>):(<Lock size={14}></Lock>)
                                    }
                                </span>
                                <p>lecture title</p>
                            </div>
                        ))
                    }
                </CardContent>
            </Card>

        </div>

        <div className='w-full lg:w-1/3'>
            <Card>
                <CardContent className='p-4 flex flex-col'>
                    <div className='w-full aspect-video mb-4'>
                        Video
                    </div>

                    <h1>Lecture title</h1>
                    <Separator className='my-2'></Separator>
                    <h1 className='text-lg md:text-xl font-semibold'>Course Price</h1>
                    
                </CardContent>

                <CardFooter className='flex justify-center p-4'>
                    {
                        purchaseCourse?(
                            <Button className='w-full'>Continue Course</Button>
                        ):(
                            <BuyCourseButton></BuyCourseButton>
                        )
                    }
                </CardFooter>
            </Card>

        </div>
      </div>
    </div>
  )
}

export default CourseDetail
