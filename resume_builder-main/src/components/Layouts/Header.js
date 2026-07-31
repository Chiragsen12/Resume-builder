import {Link, useNavigate} from 'react-router-dom';
import {
    Text,
    Button,
    Image,
    Heading,
    Stack,
    Flex,
    Box,
    Container,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useResume } from '../../Context';
// import hero from '../../images/hero.svg';

const Header = () => {


    const {setAbout, setEducationList, setSkills, setWorkList, setProjects, setTheme, setCertificates} = useResume();

    const [recentLayout, setRecentLayout] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('resume-token');
        if (!token) {
            // If token exists, redirect to Header page
            navigate('/'); // Redirect to Header after login
        }

        // fetch resume data
        const fetchResumeData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/resume/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    return false;
                }
                const data = await response.json();

                setAbout(data.resumeData.about);
                setEducationList(data.resumeData.educationList);
                setSkills(data.resumeData.skills);
                setWorkList(data.resumeData.workList);
                setProjects(data.resumeData.projects);
                setTheme(data.resumeData.theme);
                setCertificates(data.resumeData.certificates);

                setRecentLayout(data.layout);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };

        fetchResumeData()
        
    }, []);

    useEffect(() => {
        console.log(recentLayout);

    }, [recentLayout]);

    return (
        <>
            <Container maxW='7xl' as='main'>

                <Stack
                    py={{ base: 8, md: 20 }}
                    spacing={{ base: 4, md: 10 }}
                    direction={{ base: 'column', md: 'row' }}
                    align='center'>

                    <Stack flex={1} direction={'column'} spacing={4}>
                        <Heading
                            fontSize={{ base: '3xl', md: '5xl' }}
                            bgGradient="linear(to-r, purple.500, blue.600)"
                            bgClip="text">
                            Start Your Career with an Excellent Resume
                        </Heading>

                        <Text color={'gray.600'} lineHeight={1.7} style={{ fontFamily: 'Poppins' }}>
                            Resumer is a tool that often constitutes an automated process in which you follow a template and input your information. Ability to build, print, and download your resume for free in minutes.
                        </Text>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={{ base: 'column', sm: 'row' }}
                        >
                            <Button
                                rounded={'md'}
                                size={'lg'}
                                px={6}
                                colorScheme={'purple'}
                            >
                                <Link to='/LayoutPage'>Create Resume</Link>
                            </Button>
                        </Stack>

                    </Stack>

                    <Flex
                        flex={1}
                    >
                        <Box
                            position={'relative'}
                            height={'500px'}
                            width={'full'}
                            overflow={'hidden'}
                        >
                            <Image
                                alt={'Hero Image'}
                                fit={'contain'}
                                align={'center'}
                                w={'100%'}
                                h={'100%'}
                                src={'/hero.svg'}
                                draggable='false'
                            />
                        </Box>
                    </Flex>
                </Stack>

                {
                    recentLayout && (
                        <Box
                            mt={10}
                            mb={10}
                            textAlign="center"
                        >
                            <Button
                                size="lg"
                                colorScheme="teal"
                                variant="solid"
                                onClick={() => {
                                    navigate(`/builder?layout=${recentLayout}`);
                                }}
                                _hover={{ bg: 'teal.600', transform: 'scale(1.05)', transition: '0.2s' }}
                                shadow="md"
                                rounded="full"
                                px={8}
                                py={6}
                            >
                                View Recent Resume
                            </Button>
                        </Box>
                    )
                }

            </Container>
        </>
    )
}

export default Header
