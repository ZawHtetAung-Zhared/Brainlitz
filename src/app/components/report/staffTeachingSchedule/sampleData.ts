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
                  staff: {
                    name: 'Daisy	Lee',
                    hours: 15
                  }
                },
                {
                  courseName: 'Management Studies',
                  staff: {
                    name: 'Willard	Terry',
                    hours: 21
                  }
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: '3D Animation',
                  staff: {
                    name: 'Judy	Schneider',
                    hours: 18
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
                  staff: {
                    name: 'Blanche	Gonzales',
                    hours: 36
                  }
                },
                {
                  courseName: 'Cyber Security',
                  staff: {
                    name: 'Elsie	Strickland',
                    hours: 24
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
                  staff: {
                    name: 'Moses	Ramos',
                    hours: 31
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
                  staff: {
                    name: 'Amber	Jefferson',
                    hours: 19
                  }
                },
                {
                  courseName: 'Guitar',
                  staff: {
                    name: 'Laurie	Hicks',
                    hours: 31
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
                  staff: {
                    name: 'Jean	Woods',
                    hours: 27
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
                  staff: {
                    name: 'Travis	Cain',
                    hours: 34
                  }
                }
              ]
            },
            {
              coursePlanName: 'Advanced',
              courses: [
                {
                  courseName: 'Guitar',
                  staff: {
                    name: 'Dewey	Tyler',
                    hours: 39
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
                  staff: {
                    name: 'Jesus	Robinson',
                    hours: 41
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
                  staff: {
                    name: 'Travis	Cain',
                    hours: 32
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
                  staff: {
                    name: 'Vincent	Bowen',
                    hours: 42
                  }
                },
                {
                  courseName: 'Sports Science',
                  staff: {
                    name: 'Bob	Reynolds',
                    hours: 26
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
              staff: {
                name: 'Daisy	Lee',
                hours: 15
              }
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              staff: {
                name: 'Willard	Terry',
                hours: 21
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
              staff: {
                name: 'Judy	Schneider',
                hours: 18
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
              staff: {
                name: 'Jean	Woods',
                hours: 27
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
              location: 'Woodland',
              staff: {
                name: 'Moses	Ramos',
                hours: 31
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
              staff: {
                name: 'Jesus	Robinson',
                hours: 41
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
              staff: {
                name: 'Vincent	Bowen',
                hours: 42
              }
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              staff: {
                name: 'Bob	Reynolds',
                hours: 26
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
              staff: {
                name: 'Blanche	Gonzales',
                hours: 36
              }
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              staff: {
                name: 'Elsie	Strickland',
                hours: 24
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
              staff: {
                name: 'Judy	Schneider',
                hours: 18
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
              staff: {
                name: 'Moses	Ramos',
                hours: 31
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
              staff: {
                name: 'Dewey	Tyler',
                hours: 39
              }
            },
            {
              courseName: 'Piano',
              location: 'Sembawang',
              staff: {
                name: 'Travis	Cain',
                hours: 32
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
              staff: {
                name: 'Vincent	Bowen',
                hours: 42
              }
            },
            {
              courseName: 'Sports Science',
              location: 'Sembawang',
              staff: {
                name: 'Bob	Reynolds',
                hours: 26
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
              staff: {
                name: 'Daisy	Lee',
                hours: 15
              }
            },
            {
              courseName: 'Management Studies',
              location: 'Woodland',
              staff: {
                name: 'Willard	Terry',
                hours: 21
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
              staff: {
                name: 'Blanche	Gonzales',
                hours: 36
              }
            },
            {
              courseName: 'Cyber Security',
              location: 'Woodland',
              staff: {
                name: 'Elsie	Strickland',
                hours: 24
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
              staff: {
                name: 'Jean	Woods',
                hours: 27
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
              staff: {
                name: 'Travis	Cain',
                hours: 34
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
              staff: {
                name: 'Amber	Jefferson',
                hours: 19
              }
            },
            {
              courseName: 'Guitar',
              location: 'Yishun',
              staff: {
                name: 'Laurie	Hicks',
                hours: 31
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
              staff: {
                name: 'Jesus	Robinson',
                hours: 41
              }
            }
          ]
        }
      ]
    }
  ]
};
export default sampleData;
