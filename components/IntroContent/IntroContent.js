import { gql, useQuery } from '@apollo/client'
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";

const GetIntroPageContent = gql`
query IntroSections {
    introSections {
        nodes {
            content
            id
            introSectionId
        }
    }
}
`; 

export default function IntroContent(){
  const { loading, error, data } = useQuery(GetIntroPageContent);
  
  // useEffect(() => {
  //   let vbg = document.querySelector('.vidbg'),
  //     blackstar = document.querySelector('.blackstar'),
  //     bggrad = document.querySelector('.bggrad'),
  //     logohead = document.querySelector('.logohead'),
  //     dandd = document.querySelector('.dandd'),
  //     clifr = document.querySelector('.clifr'),
  //     sheader = document.querySelector('.siteheader');

  //   let blackstarspin = gsap.timeline({ repeat:-1 });
  //   blackstarspin.to(blackstar, {rotate:360, duration:16, ease:'none'});

  //   let introTL = gsap.timeline();

  //   introTL
  //   .fromTo(logohead,{scale:0},{scale:1, duration:0.5, ease:'back'})
  //   .fromTo(dandd,{scale:0},{scale:1, duration:0.25, ease:'back'},'-=0.25')
  //   .fromTo(clifr,{scale:0},{scale:1, duration:0.25, ease:'back'})
  //   .fromTo(sheader, {y:-60},{y:0, duration:1, ease:'power4.out'})
  //   .fromTo(bggrad, {opacity:0},{opacity:1, duration:2, ease:'power4.out'})
  //   .fromTo(vbg, {opacity:0},{opacity:0.1, duration:2, ease:'power4.out'},'-=3');

  // });

  if (error) return `Error! ${error.message}`;
  if (loading) return 'Loading...';
  const introsectioncontent = data.introSections.nodes;
  
  return (
    <section className="introsection">
    {
      introsectioncontent.map(thecontent => {
        return(
          <div className="introitem" key={thecontent.introSectionId} dangerouslySetInnerHTML={{__html: thecontent.content}}></div>
        )
      })
    }
    </section>
  );
}