import React from "react";
import AdSense from "react-adsense";
import Container from "../../Shared/Container/Container";
const Adview = () => {
  // for (const ele of users) {
  //   const newUser = {
  //     name: ele.name,
  //     phone: ele.phone.replace(/\s+/g, ""),
  //     city: ele.city,
  //     pin: 1212,
  //     propileImageUrl: ele.imageUrl,
  //     paymentStatus: ele.type === "Paid" ? "paid" : ele.type,
  //     status: ele.status,
  //     group: ele.group || "Free",
  //     paymantNote: ele.Note,
  //     email: ele.email,
  //   };

  //   localNewAxios
  //     .post("/users/register", newUser)
  //     .then((registerUser) => {
  //       toast.success(registerUser.data.message);
  //       console.log(registerUser);
  //       if (ele.courseDuration) {
  //         const courseTimeData = {
  //           userId: registerUser.data.data._id,
  //           startDate: ele.courseDuration.courseStartDate,
  //           endDate: ele.courseDuration.courseEndDate,
  //           durationInMonths: Number(ele.courseDuration.months),
  //         };

  //           .post(`/courseTimes/`, courseTimeData)
  //           .then((createdCourse) => toast.success(createdCourse.data.message));
  //       } else {
  //         return;
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <Container>
      {/* {adsArray.map((ads) => (
        <div className="h-[100px] w-full bg-red-500 my-4"></div>
      ))} */}
      <div className=" border-2 border-blue-400">
        <span className="block">Driving licence in italy</span>
        {/*  */}
        <span className="mt-5 text-blue-950 font-semibold">1. Minimum Age</span>
        <div className="mb-5 p-5 bg-blue-300">
          The term "minimum age" refers to the youngest age at which an
          individual is legally allowed to engage in a particular activity. In
          the context of driving, the minimum age specifies the youngest age at
          which a person is eligible to obtain a driver's license and operate a
          motor vehicle legally. The establishment of minimum age requirements
          for driving is a common practice worldwide and is typically determined
          by each country's or region's legal system.
        </div>
        {/*ads06 artical  */}
        <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="1275932962"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
          responsive="true"
        />
        {/*  */}
        <span className="mt-5 text-blue-950">
          2. International Driver's Permit (IDP):
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Explanation: Non-European Union (EU) residents may need an
          International Driver's Permit (IDP) along with their home country's
          driver's license. Purpose: The IDP serves as an official translation
          of the driver's license and is often required for legal driving in a
          foreign country.
        </div>
        {/*ads07  */}
        <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="2080876038"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
        {/*  */}
        <span className="mt-5 text-blue-950">3. EU Driver's License:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Clarification: European Union (EU) residents can use their national
          driver's license in Italy. Integration: This is possible due to
          agreements and standardized regulations within the EU.
        </div>
        {/*ads08  */}
        <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="3881042867"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        />
        {/*  */}
        <span className="mt-5 text-blue-950">
          4. Traffic Rules and Regulations:
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Speed Limits: Urban Areas: 50 km/h Non-Major Roads: 90 km/h Highways:
          130 km/h
        </div>
        {/* ads09 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="5636977663"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">
          5. Road Conditions and Driving Etiquette:
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Roundabouts: Yield to traffic already in the roundabout. Lane
          Discipline: Stick to designated lanes; overtaking is usually on the
          left. Traffic Enforcement Cameras: Monitors speed and traffic
          violations. Parking: Adhere to parking regulations; some areas may
          require payment, and illegal parking can result in fines or towing.
          Zebra Crossings: Pedestrians have the right of way at zebra crossings.
        </div>
        {/* ads10 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="9420310006"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">
          6. Road Conditions and Driving Etiquette (Continued):
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Emergency Services: Dial 112 for assistance in case of an emergency.
        </div>
        {/* ads11 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="5002552848"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">7. Roundabouts:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Explanation: Roundabouts are common traffic features. Driving
          Etiquette: Drivers should yield to traffic already in the roundabout
          when entering.
        </div>
        {/*ads12  */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="6124062828"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">8. Lane Discipline:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Guidance: Stick to designated lanes, and overtaking is typically done
          on the left. Safety: Following proper lane discipline enhances road
          safety and traffic flow.
        </div>
        {/*ads13  */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="6566915950"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">
          9. Traffic Enforcement Cameras:
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Purpose: Italy employs traffic enforcement cameras to monitor speed
          and traffic violations. Consequence: Violations captured by these
          cameras may lead to fines or penalties.
        </div>
        {/* ads14 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="3940752613"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">10. Parking:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Importance: Pay attention to parking regulations. Payment: Some areas
          may require payment for parking, and illegal parking can result in
          fines or towing.
        </div>
        {/* ads15 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="5163207082"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">12. Emergency Services:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Emergency Number: Dial 112 for assistance in case of emergencies.
          Prompt Response: Emergency services will respond to your location
          based on the information provided.
        </div>
        {/* ads16  */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="9001507600"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">
          13. Motorcycles and Scooters:
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Helmet Requirement: Helmets are mandatory for both drivers and
          passengers on motorcycles and scooters. Lane Splitting: In some areas,
          motorcycles may engage in lane splitting (riding between lanes in
          slow-moving traffic).
        </div>
        {/*ads 17 */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="3749180927"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
          responsive="true"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">
          14. Public Transportation and ZTL (Limited Traffic Zones):
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Public Transportation Options: Italy has an extensive public
          transportation system, including trains and buses. Consider these
          options for city travel. ZTL Regulations: Limited Traffic Zones (ZTL)
          are areas in some cities with restricted vehicle access. Be aware of
          ZTL zones, as entry without proper authorization can result in fines.
        </div>
        {/*  */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="9878640857"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}

        {/*  */}
        <span className="mt-5 text-blue-950">
          15. Highway Services and Rest Areas:
        </span>
        <div className="mb-5 p-5 bg-blue-300">
          Autostrade Services: Italian highways (autostrade) offer services such
          as rest areas, fuel stations, and dining facilities. Rest Stops: Plan
          your journey by taking breaks at designated rest areas to avoid
          fatigue.
        </div>
        {/*  */}
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="7591077805"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}

        {/*  */}
        <span className="mt-5 text-blue-950">16. Winter Driving:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Snow Chains: In mountainous regions, especially during winter, snow
          chains may be required. Check weather conditions and regulations
          before embarking on a journey.
        </div>
        {/*  */}

        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="8186938209"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        {/*  */}
        <span className="mt-5 text-blue-950">17. Tunnel Regulations:</span>
        <div className="mb-5 p-5 bg-blue-300">
          Headlights: Some tunnels may require drivers to use headlights during
          the daytime. Speed Limits: Observe posted speed limits in tunnels for
          safety.
        </div>
        {/*  */}
        {/* 
        <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="4434742484"
          style={{ display: "block" }}
          format="autorelaxed"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}

        <div className="p-10 bg-blue-300">
          This experience has allowed me to cultivate essential interpersonal
          skills such as teaching, leadership, teamwork, and public speaking. I
          thoroughly enjoy sharing my knowledge and empowering others to become
          proficient in web development.
        </div>

        <div className="p-10 bg-blue-300">
          As a dedicated learner and developer, I have taken my knowledge and
          passion to the next level by running my own online course on MERN
          stack development.
        </div>
        {/* ad01 */}
        <div className="h-[80px] w-full">
          {/* <AdSense.Google
            client="ca-pub-9434932401811333"
            slot="8471008657"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
            layoutKey="-gw-1+2a-9x+5c"
          /> */}
        </div>
        <div className="p-10 bg-blue-300">
          ramming abilities, I possess a creative eye for design and a knack for
          creating captivating animations. I pay meticulous attention to detail,
          ensuring that every aspect of my projects is visually appealing and
          engaging for users.
        </div>
        {/* ads 03 */}

        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="3218681975"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}

        <div className="p-10 bg-blue-300">
          driven and enthusiastic web developer who constantly seeks
          opportunities to grow and create innovative solutions. With a strong
          foundation in MERN stack development, a passion for JavaScript, and a
          dedication to delivering high-quality results, I am eager
        </div>
        {/* ads 02 */}

        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="1070212547"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}

        <div className="p-10 bg-blue-300">
          y programming abilities, I possess a creative eye for design and a
          knack for creating captivating animations. I pay meticulous attention
          to detail, ensur
        </div>
      </div>
    </Container>
  );
};

export default Adview;
