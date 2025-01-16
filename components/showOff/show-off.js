import Image from 'next/image'
import React from 'react'

export default function ShowOff() {
  return (
    <div>
       <div className='row show-off-content'>
          <div className='col-lg-4 img position-relative'>
            <Image
              src="/showOff/bride-img.png"
              className="showOff-img img-fluid"
              alt="logo"
              loading="lazy"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className='col-lg-8 desc mt-5'>
            <h3 className='title mt-3'>
              إطلالة تميزك عن غيرك في ليلة زفافك
            </h3>
            <div className='right-line'></div>
            <p className='content'>
              في اتيليه سماح القاسم فريق متخصص علشان يساعدك تختاري الفستان المناسب لكي و بكل تفاصيلك الخاصة علشان تظهري بأجمل إطلاله في ليلة العمر بأحدث موضة لفساتين الزفاف و الخطوبة والسوارية للمحجبات وغير المحجبات
            </p>
          </div>
        </div>
    </div>
  )
}
