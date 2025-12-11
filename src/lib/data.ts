import { IUserStories } from '../types'

const stories: IUserStories[] = [
  {
    user: {
      id: "manish",
      name: "Manish Kunthoor",
      username: "manishk",
      avatarUrl: "/assets/avatars/manish.jpg",
    },
    items: [
      {
        id: "manish-s1",
        mediaUrl: "/assets/stories/1.jpg",
        mediaType: "image",
        durationSec: 5,
        timestamp: "2025-12-10T18:30:00Z",
        viewers: ["alice", "bob"],
        caption: "At the beach",
      },
    ],
  },

  {
    user: {
      id: "alice",
      name: "Alice Johnson",
      username: "alicej",
      avatarUrl: "/assets/avatars/alice.jpg",
    },
    items: [
      {
        id: "alice-s1",
        mediaUrl: "/assets/stories/2.jpg",
        mediaType: "image",
        durationSec: 5,
        timestamp: "2025-12-09T10:00:00Z",
        viewers: ["manish"],
      },
    ],
  },


  {
    user: {
      id: "john",
      name: "John Peter",
      username: "johnp",
      avatarUrl: "/assets/avatars/john.jpg",
    },
    items: [
      {
        id: "john-s1",
        mediaUrl: "/assets/stories/3.mp4",
        mediaType: "video",
        durationSec: 8,
        timestamp: "2025-12-11T09:00:00Z",
        viewers: ["manish", "alice"],
      },
    ],
  },

  
  {
    user: {
      id: "krishna",
      name: "Krishna Dev",
      username: "krish",
      avatarUrl: "/assets/avatars/krishna.jpg",
    },
    items: [
      {
        id: "krishna-s1",
        mediaUrl: "/assets/stories/1.jpg",
        mediaType: "image",
        durationSec: 5,
        timestamp: "2025-12-11T07:00:00Z",
        viewers: [],
      },
    ],
  },

  // ⭐ NEW USER #5
  {
    user: {
      id: "rahul",
      name: "Rahul Sharma",
      username: "rahulsh",
      avatarUrl: "/assets/avatars/rahul.jpg",
    },
    items: [
      {
        id: "rahul-s1",
        mediaUrl: "/assets/stories/2.jpg",
        mediaType: "image",
        durationSec: 5,
        timestamp: "2025-12-11T06:00:00Z",
        viewers: ["manish"],
      },
    ],
  },
];

export function getAllStories() {
  return stories
}

export function getStoriesByUserId(userId: string) {
  return stories.find((s) => s.user.id === userId) || null
}
