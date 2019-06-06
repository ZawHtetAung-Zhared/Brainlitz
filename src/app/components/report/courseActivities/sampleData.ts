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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                },
                {
                  courseName: 'Management Studies',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: '3D Animation',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                },
                {
                  courseName: 'Cyber Security',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                },
                {
                  courseName: 'Guitar',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: 'Guitar',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
                },
                {
                  courseName: 'Sports Science',
                  lessons: {
                    count: 180,
                    present: 75,
                    absent: 50,
                    notTaken: 55
                  }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          coursePlanName: 'Advanced',
          courses: [
            {
              courseName: '3D Animation',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          coursePlanName: 'Advanced',
          courses: [
            {
              courseName: 'Health & Fitness',
              location: 'Sembawang',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Education',
          courses: [
            {
              courseName: 'Math Classes',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Music',
          courses: [
            {
              courseName: 'Guitar',
              location: 'Admiralty',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Piano',
              location: 'Sembawang',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Sports',
          courses: [
            {
              courseName: 'Health & Fitness',
              location: 'Sembawang',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Technology',
          courses: [
            {
              courseName: 'Facebook Marketing',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Dance',
          courses: [
            {
              courseName: 'Hip Hop',
              location: 'Yishun',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
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
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            },
            {
              courseName: 'Guitar',
              location: 'Yishun',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        },
        {
          catName: 'Sports',
          courses: [
            {
              courseName: 'Meditation & Yoga',
              location: 'Bedok',
              lessons: {
                count: 180,
                present: 75,
                absent: 50,
                notTaken: 55
              }
            }
          ]
        }
      ]
    }
  ]
};
export default sampleData;
