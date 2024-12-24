function ProjectComment() {
  const projects = [
    {
      name: "Project 1",
      id: 1,
      category: "development",
      createdAt: "Fri Dec 13 2024",
      details: "lorem ipsum dolor",
      dueDate: "",
      createdBy: {
        id: "created user id",
        displayName: "User 1",
        photoURL: "photoURL",
      },
      comments: [
        {
          id: 1,
          createdAt: "Fri Dec 20 2024",
          content: "Comment text 1",
          photoURL: "photoURL",
        },
      ],
      assignedUsersList: [
        {
          id: 1,
          displayName: "Test User 1",
          photoURL: "photoURL",
        },
      ],
    },
  ];

  return <div>ProjectComment</div>;
}

export default ProjectComment;
