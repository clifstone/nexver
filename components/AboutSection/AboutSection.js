import { useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import { InView  } from 'react-intersection-observer'
import LoadingScreen from '../LoadingScreen'
import { GetAboutSection } from '../../data/queries'

const getQuery = GetAboutSection;

export default function AboutSection(){
  const { loading, error, data } = useQuery(getQuery);
  if (loading) return (<LoadingScreen />);
  if (error) return `Error! ${error.message}`;

  const aboutsections = data.homePageSections.nodes;

  return (
    <section id="aboutsection" className="aboutsection fullsection">
      <div className="wrapper">
        <InView threshold={0} triggerOnce='true'>
          {({ ref, inView }) => (
            <div className="sectionheading">
              <motion.h2
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 0.5, ease: 'backOut' }}>ABOUT CLIF R.</motion.h2>
              <motion.p
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 1, delay: 0.15, ease: 'backOut' }}
              >Here, you&rsquo;ll find out more about me, what I do, and my current skills</motion.p>
            </div>
          )}
        </InView>
        {
          aboutsections.map(thecontent => {
            return(
              <InView threshold={0} key={thecontent.homePageSectionId}>
              {({ ref, inView }) => (
                <motion.div className='aboutitem'  dangerouslySetInnerHTML={{__html: thecontent.content}}
                ref={ref}
                initial={{ opacity:0, y: 50 }}
                animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
                transition={{ duration: 1, delay: 0.25, ease: 'backOut' }}
                ></motion.div>
              )}
              </InView>
            )
          })
        }
      </div>
    </section>
  );
}