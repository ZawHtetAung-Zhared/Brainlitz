let sampleData = {
  location: [
    {
      locationName: 'Woodland',
      categories: [
        {
          catName: 'Art & Science',
          coursePlans: [
            {
              coursePlanName: 'Beginner',
              courses: [
                {
                  courseName: 'Business Administration',
                  students: 35
                },
                {
                  courseName: 'Management Studies',
                  students: 31
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: '3D Animation',
                  students: 43
                }
              ]
            }
          ]
        },
        {
          catName: 'Technology',
          coursePlans: [
            {
              coursePlanName: 'Beginner',
              courses: [
                {
                  courseName: 'Facebook Marketing',
                  students: 47
                },
                {
                  courseName: 'Cyber Security',
                  students: 28
                }
              ]
            }
          ]
        },
        {
          catName: 'Education',
          coursePlans: [
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: 'Math Classes',
                  students: 51
                }
              ]
            }
          ]
        }
      ]
    },
    {
      locationName: 'Yishun',
      categories: [
        {
          catName: 'Music',
          coursePlans: [
            {
              coursePlanName: 'Weekend',
              courses: [
                {
                  courseName: 'Orchestra',
                  students: 24
                },
                {
                  courseName: 'Guitar',
                  students: 49
                }
              ]
            }
          ]
        },
        {
          catName: 'Dance',
          coursePlans: [
            {
              coursePlanName: 'Beginner',
              courses: [
                {
                  courseName: 'Hip Hop',
                  students: 21
                }
              ]
            }
          ]
        }
      ]
    },
    {
      locationName: 'Admiralty',
      categories: [
        {
          catName: 'Music',
          coursePlans: [
            {
              coursePlanName: 'Individual',
              courses: [
                {
                  courseName: 'Piano',
                  students: 34
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: 'Guitar',
                  students: 56
                }
              ]
            }
          ]
        }
      ]
    },
    {
      locationName: 'Bedok',
      categories: [
        {
          catName: 'Sports',
          coursePlans: [
            {
              coursePlanName: 'Weekend',
              courses: [
                {
                  courseName: 'Meditation & Yoga',
                  students: 55
                }
              ]
            }
          ]
        }
      ]
    },
    {
      locationName: 'Sembawang',
      categories: [
        {
          catName: 'Music',
          coursePlans: [
            {
              coursePlanName: 'advanced',
              courses: [
                {
                  courseName: 'Piano',
                  students: 38
                }
              ]
            }
          ]
        },
        {
          catName: 'Sports',
          coursePlans: [
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: 'Health & Fitness',
                  students: 44
                },
                {
                  courseName: 'Sports Science',
                  students: 25
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  category: [
    {
      catName: 'Art & Science',
      coursePlans: [
        {
          coursePlanName: 'Beginner',
          courses: [
            {
              courseName: 'Business Administration',
              location: 'Woodland',
              students: 35
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              students: 31
            }
          ]
        },
        {
          coursePlanName: 'Advanced',
          courses: [
            {
              courseName: '3D Animation',
              location: 'Woodland',
              students: 43
            }
          ]
        }
      ]
    },
    {
      catName: 'Dance',
      coursePlans: [
        {
          coursePlanName: 'Beginner',
          courses: [
            {
              courseName: 'Hip Hop',
              location: 'Yishun',
              students: 21
            }
          ]
        }
      ]
    },
    {
      catName: 'Education',
      coursePlans: [
        {
          coursePlanName: 'Advanced',
          courses: [
            {
              courseName: 'Master in Mathematics',
              location: 'Woodland',
              students: 51
            }
          ]
        }
      ]
    },
    {
      catName: 'Sports',
      coursePlans: [
        {
          coursePlanName: 'Weekend',
          courses: [
            {
              courseName: 'Meditation & Yoga',
              location: 'Bedok',
              students: 55
            }
          ]
        },
        {
          coursePlanName: 'Advanced',
          courses: [
            {
              courseName: 'Health & Fitness',
              location: 'Sembawang',
              students: 44
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              students: 25
            }
          ]
        }
      ]
    },
    {
      catName: 'Technology',
      coursePlans: [
        {
          coursePlanName: 'Beginner',
          courses: [
            {
              courseName: 'Facebook Marketing',
              location: 'Woodland',
              students: 47
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              students: 28
            }
          ]
        }
      ]
    }
  ],
  coursePlan: [
    {
      coursePlanName: 'Advanced',
      categories: [
        {
          catName: 'Art & Science',
          courses: [
            {
              courseName: '3D Animation',
              location: 'Woodland',
              students: 43
            }
          ]
        },
        {
          catName: 'Education',
          courses: [
            {
              courseName: 'Math Classes',
              location: 'Woodland',
              students: 51
            }
          ]
        },
        {
          catName: 'Music',
          courses: [
            {
              courseName: 'Guitar',
              location: 'Admiralty',
              students: 56
            },
            {
              courseName: 'Piano',
              location: 'Sembawang',
              students: 38
            }
          ]
        },
        {
          catName: 'Sports',
          courses: [
            {
              courseName: 'Health & Fitness',
              location: 'Sembawang',
              students: 44
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              students: 25
            }
          ]
        }
      ]
    },
    {
      coursePlanName: 'Beginner',
      categories: [
        {
          catName: 'Art & Science',
          courses: [
            {
              courseName: 'Business Administration',
              location: 'Woodland',
              students: 35
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              students: 31
            }
          ]
        },
        {
          catName: 'Technology',
          courses: [
            {
              courseName: 'Facebook Marketing',
              location: 'Woodland',
              students: 47
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              students: 28
            }
          ]
        },
        {
          catName: 'Dance',
          courses: [
            {
              courseName: 'Hip Hop',
              location: 'Yishun',
              students: 21
            }
          ]
        }
      ]
    },

    {
      coursePlanName: 'Individual',
      categories: [
        {
          catName: 'Music',
          courses: [
            {
              courseName: 'Piano',
              location: 'Admiralty',
              students: 34
            }
          ]
        }
      ]
    },
    {
      coursePlanName: 'Weekend',
      categories: [
        {
          catName: 'Music',
          courses: [
            {
              courseName: 'Orchestra',
              location: 'Yishun',
              students: 24
            },
            {
              courseName: 'Guitar',
              location: 'Yishun',
              students: 49
            }
          ]
        },
        {
          catName: 'Sports',
          courses: [
            {
              courseName: 'Meditation & Yoga',
              location: 'Bedok',
              students: 55
            }
          ]
        }
      ]
    }
  ]
};
export default sampleData;
