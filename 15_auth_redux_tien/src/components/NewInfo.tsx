import { useRef  } from "react";
import {
  NewInfoSection,
  TopNewInfo,
  TopNewSwiper,
  GroupLink,
  Description,
  IMG,
  Term,
  Details,
  TopNewBox,
  SwiperSwaperNewInf,
  MovingBar,
} from "../pages/style";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { ButtonNormal, LargeButton} from './../../components/ButtonStyled'

import { APITokenInHeader, baseAPI } from "../../global/global";
import { Icon } from '@iconify/react';
// import LoadingScreen from "../../resume/components/Loading";

export const NewInfo = () => {

  const scrl = useRef<HTMLDivElement | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["job"],
    queryFn: async () =>
      fetch(`${baseAPI}/job-tests?_sort=created_at:desc&_limit=10&populate=company`,
      APITokenInHeader
      ).then((res) => res.json()),
  });
//   if (isLoading) {
//     return (
//        <div style={{ height: "100vh" }}>
//           <LoadingScreen height={"100vh"} />
//        </div>
//     );
//  }
  if (error) return "An error has occurred: ";

  const slide = (shift: number) => {
    if(scrl.current){
      scrl.current.scrollLeft += shift;
    }
  }; 
  function truncateText(text: string, maxLength: any) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const renderedItems = data.data.map((item: any, index: any) => (
    <Link to={`/details?id=${item.attributes.job_id}`} key={index}>
      <GroupLink>
        <IMG>
          <img
            src="https://www.workport.co.jp/img_rec/231/rec1.jpg?date=20230406"
            alt=""
          />
        </IMG>
        <Description>
          <Term>
            <p>{item.attributes.company.data.attributes.name}</p> <br />
          </Term>
          <Details>
            <p>{truncateText(item.attributes.want, 100)}</p>
          </Details>
        </Description>
        <Details className="money">
          <p>
            <span>給与</span>
            {item.attributes.salary_min}万円～
            {item.attributes.salary_max}万円
          </p>
        </Details>
      </GroupLink>
    </Link>
  ));

  return (
    <>
      <NewInfoSection>
        <h2>新着求人</h2>
        <TopNewInfo>
          <div style={{display:'flex', fontSize:'1.4rem', fontWeight:'bold', alignSelf:'flex-end', marginRight:'50px'}}>
            Scroll<MovingBar />
          </div>
          <TopNewBox>
            <TopNewSwiper>
              <button className="LeftBtn" onClick={() => slide(-450)}>
                <Icon icon="carbon:next-outline" width="50" height="50" hFlip={true} />
              </button>
              <SwiperSwaperNewInf ref={scrl}>
                {renderedItems}
              </SwiperSwaperNewInf>
              <button className="RightBtn" onClick={() => slide(+450)}>
                <Icon icon="carbon:next-outline"  width="50" height="50" />
              </button>
            </TopNewSwiper>
          </TopNewBox>
        </TopNewInfo>
        {/* <LargeButton>
          <ButtonNormal>
            <Link to="/search"><span>{t("top.button.shinchaku_kyujin_ichiran")}</span></Link>
          </ButtonNormal>
        </LargeButton> */}
      </NewInfoSection>
    </>
  );
};
