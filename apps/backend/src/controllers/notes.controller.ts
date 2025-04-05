import type {Response} from "express";
import StatusCodes from "../types/response-codes";
import type {UserRequest} from "../types";
import UserModel from "../models/user.model";

class NotesController {


    /**
     * Save notes
     */
    read(req: UserRequest, res: Response) {
        const videoId = req.params.videoID as string;
        UserModel.findOne({email: req.user?.email}).then(
            (user) => {
                if (!user) {
                    res.status(StatusCodes.NOT_FOUND.code).json({
                        message: "User not found",
                    });
                    return;
                }
                const userVideo = user.userVideos?.find((userVideo) => userVideo.videoId === videoId)

                if (!userVideo) {
                    res.status(StatusCodes.NOT_FOUND.code).json({
                        message: "Video not found",
                    });
                    return;
                }
                const notes = userVideo.notes;

                // success send the notes
                res.status(StatusCodes.SUCCESS.code).json({
                    notes: notes,
                });
            },
        ).catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                message: "Internal server error",
            });
        }
        )
    }

    /**
     * Save notes
     */
    save(req: UserRequest, res: Response) {
        console.log("save notes");

        res.status(StatusCodes.SUCCESS.code).json();
    }

    /**
     * Update notes
     */
    patch(req: UserRequest, res: Response) {
        console.log("update notes");
    }
}


export default new NotesController();