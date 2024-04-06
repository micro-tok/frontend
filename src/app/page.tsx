'use client'
import React, {useEffect, useRef, useState, MouseEvent, MouseEventHandler} from "react";
import {IconDeviceSpeaker, IconDeviceSpeakerOff, IconVolume, IconVolume3, IconVolumeOff} from "@tabler/icons-react";

const videos = [
    {id: 1, src: "acho.mp4"},
    {id: 2, src: "ibz.mp4"},
    {id: 3, src: "idk.mp4"},
    {id: 4, src: "mr-robot.mp4"},
];
export default function Home() {
    const [currentVideo, setCurrentVideo] = useState<number | null>(null);
    const [muted, setMuted] = useState(true);

    const videoRefs = useRef<any[]>(videos.map(() => React.createRef()));

    const pauseOtherVideos = (event: any) => {
        videoRefs.current.forEach((ref) => {
            console.log('a', ref.current.id, 'b', event.target.parentElement?.parentElement.id);
            if (ref.current.id !== event.target.parentElement?.parentElement.id) {
                ref.current.children[0].children[0].pause();
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentVideo(parseInt(entry.target.id));
                }
            });
        }, {threshold: 1});

        videoRefs.current.forEach((ref, index) => {
            observer.observe(ref.current);
            ref.current.id = videos[index].id;
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (currentVideo) {
            const video = videoRefs.current.find((ref) => {
                console.log('ref', ref.current.id, 'current', currentVideo);
                return ref.current.id == currentVideo
            });
            console.log('video', video, currentVideo);
            video?.current.children[0].children[0].play();
        }
    }, [currentVideo]);

    return (
        <main
            className="w-full flex flex-col snap-y snap-mandatory overflow-y-auto h-dvh bg-purple-950 bg-opacity-40">
            {videos.map((video, index) => (
                <div
                    key={video.id}
                    className="!h-dvh min-h-dvh snap-start p-6 flex flex-col items-center transition-all justify-between"
                    ref={videoRefs.current[index]}
                >
                    <div
                        className="relative h-full max-h-full aspect-[9/16] flex justify-center items-center bg-black border-2 rounded-xl">
                        {currentVideo === video.id ? (
                            <>
                                <video
                                    src={`/test/${video.src}`}
                                    autoPlay
                                    controls={false}
                                    playsInline
                                    muted={
                                        // if the video is the current video is first video
                                        // then mute it
                                        muted
                                    }
                                    preload={"auto"}
                                    onPlay={pauseOtherVideos} // Pause other videos when this one starts playing
                                    onClick={(event: React.MouseEvent<HTMLVideoElement>) => {
                                        const video = event.target as HTMLVideoElement;
                                        if (video.paused) {
                                            video.play();
                                        } else {
                                            video.pause();
                                        }
                                    }}
                                    onEnded={(event: React.SyntheticEvent<HTMLVideoElement>) => {
                                        const video = event.target as HTMLVideoElement;
                                        const nextVideo = video.parentElement?.parentElement?.nextElementSibling;
                                        if (nextVideo) {
                                            nextVideo.scrollIntoView({behavior: "smooth"});
                                        } else {
                                            videoRefs.current[0].current.scrollIntoView({behavior: "smooth"});
                                        }

                                        if (video.paused) {
                                            video.play();
                                        }
                                    }}
                                />
                                <button
                                    className="absolute bottom-4 right-4 bg-white p-2 rounded-full text-black transition-all"
                                    onClick={(event) => {
                                        setMuted(prevState => !prevState);
                                    }}
                                >
                                    {muted ? (
                                        <IconVolumeOff size={24}/>
                                    ) : (
                                        <IconVolume size={24}/>
                                    )}
                                </button>
                            </>
                        ) : (
                            <video
                                src={`/test/${video.src}`}
                                loop
                                muted
                                playsInline
                                preload={"auto"}
                                className="w-full max-h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            ))}
        </main>
    );
}
