import { authFetch } from "../storage/authFetch";
import { API_SOCIAL_URL } from "../constants";
 

const action = "/listings";
const method = "post";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  try {
    const response = await authFetch(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const createdPostData = await response.json();
      toast.success("Post created successfully");
      return createdPostData;
    } else {
      const errorData = await response.json();
      console.error(
        `Error creating post with status ${response.status}:`,
        errorData
      );
      toast.error(
        "Error creating post: Response from the server is not as expected."
      );
    }
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error(`Error creating post: ${error.message}`);
  }
}
