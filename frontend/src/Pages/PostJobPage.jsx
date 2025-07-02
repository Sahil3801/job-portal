import { Divider } from "@mantine/core";
import PostJob from "../Components/PostJob/PostJob";

const PostJobPage = () => {
    return (
        <div className="min-h-[90vh] bg-white-50 font-['poppins']">
            <Divider size="xs" mx="md" />
            <PostJob />
        </div>
    );
};

export default PostJobPage;