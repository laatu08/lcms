import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:5000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLetureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params=useParams()
  const {courseId,lectureId}=params

  const {data:lectureData}=useGetLectureByIdQuery(lectureId)
  const lecture=lectureData?.lecture

  useEffect(()=>{
    if(lecture){
      setLetureTitle(lecture.lectureTitle)
      setIsFree(lecture.isPreviewFree)
      setUploadVideoInfo(lecture.videoInfo)
    }
  },[lecture])

  const [editLecture, {data,isLoading,error,isSuccess}]=useEditLectureMutation( )
  const [removeLecture,{data:removeData,isLoading:removeLoading,isSuccess:removeSuccess}]=useRemoveLectureMutation()

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        console.log(res);
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload video");
      } finally {
        setMediaProgress(false);
      }
    }
  };


  const editLectureHandler=async()=>{
    await editLecture({lectureTitle, videoInfo:uploadVideoInfo, isPreviewFree:isFree ,courseId,lectureId })
  }

  const removeLectureHandler=async()=>{
    await removeLecture(lectureId)
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Lecture updated successfully")
    }

    if(error){
      toast.error(error.data.message || "Failed to update lecture")
    }
  },[isSuccess,error])


  useEffect(()=>{
    if(removeSuccess){
      toast.success(removeData.message||"Lecture removed successfully")
    }
  },[removeSuccess])

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit lecture</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur{" "}
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={removeLectureHandler} variant="destructive">Remove Lecture</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLetureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to programming"
          ></Input>
        </div>

        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to programming"
            className="w-fit"
          ></Input>
        </div>

        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress}></Progress>
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={editLectureHandler}>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;