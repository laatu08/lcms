import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <section className="max-w-7xl mx-auto my-14 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            My Learning
          </span>
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-md max-w-xl mx-auto">
          Track your enrolled courses and continue where you left off. Happy learning!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 transition-all duration-300">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyLearning;

// Skeleton loader (now with shimmer effect)
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 shadow-inner relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      </div>
    ))}
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-5 animate-fadeIn">
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAABs1BMVEX////+/v4AAAALBwTc3Nx1dXX///0jIyP///vx8fH//f8FAAALCAMHBgP+7AATEQ6hoaH39/f//9ro6Oj15zZdbvy6rS5dbf+YmJj65wn79550dHT/6gDT09P/7yM2NTNnZ2doYi6BgYFLS0s8PDyysrJdb/hcXFy/v7/IyMh9fX3X19fj4+MsLCyMjIyamppISEhiYmL///L//+q2trZUVFQmJiaooi8aGhqpqakAADUAABkAABNGR037+Kr//8gAACElJ0Q/RplueepVWWIlLnhibNpqdPYiI15GQyoxKQBMU65SWr0VFziakyXIvDg4Nj82PYRoZQrm3jwABFFhbtMzNADPxy8nLDJ/eBoxP35LSxZgX8v69khTUEIbFiIlLVRCQC9cWBVSUWhWZb8zN1fa0TsMEU4mL297foqrrEmXlEg+OBZBTZsPGTVaVRkfJQ3j4WDIz0YcKll1cidTWJchJEQdH2cAADgyNoKJktTa4/dMUHBmYkZiXiCmsOpzgtvCyeolJxi0uen77H2+tViIh3nb7P0lIjVwe99sds7161GAjduXkp62qTVxbAD783IrzeO9AAAc4klEQVR4nO1dj3/T1rW/V3EUyT+ChRxiMP5R/3bsOE6wQ9xSWBNq0SblR1ngQVnXMQr0vZe+7dGt69hby+jWtXQrf/I759wrWZLjYMd2yGfzAYIjy7q6X53f59xrxqY0pSlNaUpTmtKUpjSlKU1pSlOa0pSmNKUpTWlKU5rSlKY0pSkNRPx138DxI4KET4HxkJEASKaYeKjZyPw78okzZc7VnjcbenSW3hoTLqrGuKoFuQavekc7JoST1WuBmk4T98+81mIsnh2fSgE8NAQG8OCaelz5T2WV1XVFUeYaK/tgUi+Dmq3Xx8YnGuca/FNVuGAweFwxYbMASCQcCSlKBm7T9+YyccjSyvgYhUuZ0dYAnvFcc7wEM00gIJFIOFRXlCQLet+sZPGFkVSaY3JUuIa4q/GfvW1o/HhqFM7KygyRssyySpS5bxIwySQD0dlGo17Rx4SJtga8UX5nc+tGm2mqnyuPBXGWtzFZYWy15pk553q6lChUDTY+uwNXCVx+t2N1riRVYJmxXHPcFLchycPMM6YPE66L/4fARBU6oudsYEBVhR969sq94tbme+8bYHaOjejwrnnhdQGJouRQOHyYHOrCcp5c0/xvajhq+51ty9r54GrsWoYFg8dGx6ryoavV+IaAJDRXgYPMKBkjXRdnCEYWfA/wP/zqMwiiwqrXb3SKu1c+vJmaT32YRA9llAHHSSDFRiWeAxMckoKzyvI18M9WRwqDUTLQG0P3Q+ux3cATeuLnu5Z149bt1NmzZ+dv5tix8U/gPszsCQBkxiGlzgL5qtFKHt4Lwc+hzw6EmlM3efc4UVBrf7BjWdv/cT4GgAAoqauFY5KIgEnzuBuQ8MxMBLwPliiVCiO58HBhFX0PYBR9tlQqtcslt1+sNr/cAmtz52bq7Pz8PPw7G3tPPx6iw5neUiISDEkR8NVYvcJGtLgaCoxanm2bpXKQmVF0AV2M0r7RufuREJt55JOz86fqo89nLKSnlUjEBgMJmEYJMLaSXl6qHE6fuD8T/fLe5psQHgEoSjaRbtrvqpoxe/2jXwAcp+dJdpBRPj4G/gkEXmpDsRkkHJ5BQJYq3FzOLpUYS2aX23xYXsGzA/HWxnJ6/Ze5evnTrQXrkxooFlZXdGbE1+u6uB7a5sRtEBrBJvg39vFIdm48BHdXV8JdTCLKekHcVkWwiBFNl4fWKeVWqWzSK7NS2lxY7FwGI8uMyBIdy0nFDcpG09+PkdQIWFLXsuOc3CGJA0NHZlx6ZFUHe8ilo0ocYiTiw8lPrZU1pbsG2vXy7kLxcQUxaSoEhmnbd45ppOjVlI3JfOrax8dBx3II8yIuSFoGE0hwunFhJkq1YS5YzlcdaYNQ4AmIzt/RZ2WNBl6btTfagocQfK796ibCgUzy8P6bBXYsfLZlDyb+2RMo5cGsAckDK7RcATPEdL9+YG1jrkWrKW26XENocHwXfbnKTynSr7E7Tx7sfqq/fv+EqyQ6tj5ResSZnrfeGvxOKzmXTubaGq9df/yWAU48MCSBlcxvKOj9iAAIDmRuA5ekTs1tWkXry+R45jUKqWoVMHF0LDw/3+yBSUyVJaqDXrCW5u4Md1CDALCAaX7VUJYIrEyVlQs0NhdZaT1//uG1W4+3iosLW4+OASacBRATW3LSPkjwrqMFplbqQs41jGC4DHY1nBX3Xo3lA27PF16pnDVRZlhbAG42nDFU/APRodFOrERvAJfsXGmz1++fgA/bderDildvoLhrDPBQ9RLdKswPjqmU9KD5gjF1gYITr+9jtyt0MJ+nM1Z6Qhrhq1zefPD4eoD1BM9HT3CTDcXWJxHFG/HB/OFfLYNplEJ2Nr6fAKmufAeY7ble/w7UyzJobpG/5Wx5n3uAOFE1Pvus/DFYotcOCUIQdexOWPG9CYG7pgZhFiu/39y5t3Pls3KzUIC/guhF2fOJwso+mIBHslzXlxQyYRUl4VcZqoZJauC9YJ5pPVWC10Bwn5gyCcucCRKFfoLwbtmyfh1MQnEB5F154z/Pe+i/8i5JAJ7T+wxTbikJOqMEhrjtlR5MOEH4zLlZOg6iQ0+1aVseuFmkvOOjYMpYZa03dwGQ4sLCQrHzwXmK6x06X3Bfra/NRv7IpldMVstlFCXeexMopqh3jkMdmjgdPFmBifCk5H/0dpAZn6GVXFxYWFxcLBatd4UrLmKUs6n3PSFbdbbfMMwIMKOQS2TKLFDxCxclJ+FFtHksMCG1py5RxjE0Q3wbUKpkUzBHxlnt19sWIIKgACwAyt2rKRHFIt1OMHdOudLP3+UiUmDV+n5TpnIx/F8y5YvXT5g6R4OslGh+ZcBElG3BplSe7BQBEPgHkgPsUly07t5xkkCpn5KeOZT9UjEUGeujfHq8hPKjZ0H3iadcV5LIJeXVTIG1H3WKFnIIAILYoAgVN39CnUIhyn97eX00TMBoHRsSxR2ezFAQwlqYH0yms6YZVx5vLRQFg4D4CI2ysGhtfhgjhYKZQo8s9JWdgShtHANd4qNEgDImc0pST2R0tCJ7wCOoSIr0AwUIEVqw9u7HSMPeN73l3erSYcdGz+XQH54glajkFwAZypVRu76zbRFzoNUBIO4VFwSvgKMCoMyfnb9ZUr1tTHrpsGPDs8iNVnGcCFHJD5sKlKwBkVjl8x0BANobULJ7F7aLgmvgV2vvf2LzWI3x+eL5w2dTC/XjBgl6kRmODnZWqWCsV3izU6T5I4sAJp3f/Pa9XXi9SHJkFbfvp1If9XRbZAL7X/7VpOeNfVqiXjdRrKfWS7qGGfZHW8QQyCioR6yf355/+PddYXoQLGv7/v8mKAUiyp54BUAyehini7IqlVefd/RUg4DEzEWxvcxYfddCniBJQfNr7aGndu3J1iKxCjoq1h7aJ+orAsdctgwEMoeokeEnotnjJjlEgQSrpJPgrrHa25sQ4BCTCGVSvPdRjMq5X6FdlrbZ2ksgIhr2CwhVC3PbOEyJjLNk41g49T2kl+KrBspN5fPt4iLFfIJLYPqf/jaF9IsvtsmrFSxkbWapSyOIAQtdgrNEckhMyOmvLRvHtIs/LlIF8T/sEicsOLBYN27dufMT0hfKrkWMQtbIuls3ARUIBJxum+aQpSDSq3p6iFrJ0RIvxQ2j8va7FrmuNpuAN/JACSkXHuzu7DzY3n7UsT19AGXr8Vufxg1MQMtOJG6khx0UQub8MUhM9yHO2vl0/O1d4ZMIu4uCs/WzcFjZk3b5wWOLAh9y9he2Hv9u782qJj03fObDeigISeV4yg1zMheXO4u2X0JWt2g9Ds0ojy2hXUGzfmURIBT8FLeubO9+rqGqpUtQkm7gaJ8GHBgSTVQJRMXgCAlGS6D7isJB4Q26rEo48kFHWqDFxa0be5aQHVSzu3cfW5vglDhplGZ08IfOKVU7qOBgOz6mdDTK6xwVcSzgxLcde0MMs/sWSM6OSBSQEe5c2SW4rKK1/ejKztaidZ11W8Jrq8NgwgLpITxfFfmRiodHKWsYnn61IDUGcUPng1BIuWsJvqC07GLnUQff7bz7zj+SH4AXZ73J5HIKbM1oDDEaq6VrA0IomwWlYB5tMk7lv9+yk0iYqn+szISebBWL0tIgXgs7X1rWgyuXyzCbJji8gIm8SzQiDebUi7s/eokLwTEHvi9G9TYstnLmb7SdKOGTaD+Wzgkwg3VDCYcvdGQ8LFw1eG/vypW7d+Nwtl5f/mRz9w8sGa3XCxQRajnV8xD7uvqI3/LAgqOK9HAwGNTWgkdb76DVRYmvOhZ59sUt0K+gTLquim2K7nUs68uKmW2UmV64HGrNNpPJ9kbb0M1aXjcDlWahXWhWAubBhrk1RNwnyrLGH394qgWPlE3E4Fr7TzcedDqd3b1PlHBI+RO8gj+d3Xs7graJrM7npTJ6saBXYeq16GXlN//3xp/v3//z/VthRVJ6daXaV19E44MpSyGCWANiRmfxa+BF/ekRr5ILMuNtRbnw1gU5rwsXfnlBvJ6r1+vxeHwlGi3U/2AtbNexgwT7r1gz99GdUw9jsZSg2M1rV+/jsij8VD5u7reCjpl5l2CBIK3mPNQqCcpITLCLgT0F7fX1s6ffdJ5h/f7oXD3OVtprhotYAiQIyF2/u3xvsWg9qYm1aoW/XH2Ykh2upwUBMDdP3VKwoVIUBHor66vugj340CvcPSjPykeStfnk+TP+rFMUcYf1HDN8RyZD2AbASaVRix8MrIuKWOiEyajPAo5nNzFyvneZBVU1kL4aIzzmT8defHvmzMVLQBcvnvn25cu/3qL6fARbhf3PtFZycw/nuArERThoJAIfNQVy6lPwCyyZDV38huNCqMmvp3QGwDqLiGBU2Ss6E4Y/8MSCQVH3KH9pUVHjy4rKovdvUg3s9ItvL146tyafHUC5du7kpUt/owI96Jco85nldttzwNsyB5eFQcMwaMK+u+++J4fxj1//iJgEtaNZTcnlKp51tBYqrS5RQbvokZBorg6oyDug63RQJkWMATvXeeJOjMpfL85c0qhJh+IRTfAYvCgriujfj/vMcsJrh1tuTwWY8QRhOaPYnn9Q/e77xcXdp/DyOcjOMxjpSMIecctl6vPD+xeehnhiEWWVUUoNGPbtnUWBibX396vUZxD79uSagARTTJhjCiKq1OYkVr9E/B0WGY+7lkx4322CJsJBW/aBIDe+Xyw+A1ZV2TcLxe+fPz2iUNCsgmeR1mU6BGeoakZarvuSXUqcxTct6cFZex+mUJXELq2pQeFeYi8JmkkNmRsXl8P0ZBOUlzGyHuek5GkuVFma2t0jitPyw7WnnUXrKbn3z1HN/sDVSUgP77qZRjm+Ordcysbb9YT7DGcRaUTJ1tuFSkDnlSvWInm0wMrvk3Z9cVJl/mdGqliQbEpW1j3Wh8p+dgxQ6zb+MdHNhCosrKRdDT9fQ6jxFBtu2dfoVf/AJ7X+CW/KSNbz+bjsj6eFou6+vZxkk0K13GzXZ0vX3xJJJ4iRrSu3UZe8OKkduIrPWJaX8OrZXNWGBNfnejFpkRIKyyYhpOAumpwfAQgNnJTi199h6DMp4THruaWKvTQWgnf3YjfsHZLzcfogZrepmIHsu/NhigRHw8is7wCcFeQ15gz3UQoAReu1nve4KqwqP3DCcO6Ff0OuyY/PnoKTsrBrUMVgMnxSS7TKho0H/pmtuNkEnqC8vbaIwdT2DYvqO5iUfIJscvqiqGa4UfA1zfI5eZGmB+9aOilf4Q4ILpeWzSr2+junlVZ9+uy7H4sy2UUum5M4GBsJs1v3h2Fmy92zB/ctGkWVE7pY+Bp4JCBBJdv5CByT+ZfnaPUFl2s57A+6h2JxqVFKXuOiry7pxCYND6LMtE2V3sUQQ27jR1TsoMc6BnHJuFNLVENYbvvvv970zmaJBFs8MZTgzylbKx7X5nlsVboIR4Pk+KKkRbPZeNlgPkxqAhPyhD13UU7XgUujbe/p9grnWdfNBbG37jmYOghHF4vPhdCNHROW3DD91zXy3mF0NImRmZBSE4yV2aNkrSiQfvJw3maTICmUwgmKUBLprC+Fwk4oov/WzZUihCsvJyo5b0pB3wiJs2su7x1tPPvjYuepAR7tvee00nD8Dkoyr/ufJ2v7MsxxdJ3g7mYFY7Wx9iOadECdpEHDnr7IKEmKn4KoDd1dsC6FvIGBrLM6A6JIt4JQuwMCVVu+OllbnuxZ2oxKiz374TkmJ757KhI96rjTBWbe9EUgMIV17xPj6JgjJlWcR5D9bY/QIDZZ6NwHTGKXnPmJqYiZlDPUq+88R3uaGfzFP5WSV6KCy6TDIh6monWLmgy4Jhb8Oe6BQ+By1r0wtUXjLOhGKpFr2q/vLVCimqpfdwCTl+fscw0lFBbuLt71Z389s+ZaoFCWSlb0FHs2D0HnzdsoqIhIJ+eBThUL6fgk68qU5PLbh2WfdsxLNpF1LI3pb6IPS2V069FV8GG/dVghKtikIS5b+zD2cq17rYDkkzTxoReTUsB7H7TTCPiwHm1PwZPwSCbUucOZsbHPYU+XnXTrkU3SDrO2//KYrCGwyvYv/zk/f/qMfUFa3iG2TCFqxebPaI7wyHWYoQ3qx/fok4AT5olBq1Id56Vtl9k00ZQ/OR7BpFDv+ljOcjXPr+BhR2jBMa24SUazmdyGpuxh81ZxsfNO+9T8fOoik40nZjhELoXt8v3j9nzspCM7um2MPZgQrXpWwOAiBeSSsNKIJg15SNhdVZvsplyGNx4TVM147y4pVgoqYTp3aSWgg11qKw9Qm1jvlhGT2CVbYSZlRo3SYhjFXQUmcgTLxmSmBxPXsi8iW8o2ks3Zxmq94mz8gLZ47IbGTWV/hgdf+xfWJKSyi9K5yTr6BG/X0h+A21bcucyiiMlJyd8yfI4odghT/SI1/+KcPQejD58A1BXmUZtLjtVmuGC7XiotVTA6pd3bJggK7+1PRO53ed74whS6jjxspAaFiJnC+l1rwboSkJjYEyw4mAiq/TmF70oSfBL2YcIp+vPwiXlC+mtOxglxadASs4m2Re7TJcIpEPNQXc4yKz+TTVLoktaXtoub8BjdmHBhdiJdTMw3ABPbeemDCV7Otzpwxe3IMLu2ozczG1nPjhhjJ26W/PoVAzGvhtHtQKwmby5JVQUzwbTrv7tucDcmvBeT2hspcHJV52L7YsKMhuEddF1iIvlYCiYFAZm5er9VZOOgQMJ/BIs6rt/sSQIkCbsULrZWqsRRqsqYWXdhwvbjk7NdJdtHdljbsxSjm2lpeRMWgoxCfnVyXbS967E4T7v8NbwhRWKSdNoDsvgyips91iAWHgiTg/mEGzn3kwd9lZeD9mtdSmZy5Qkpll4+YQX30hsIy5tiTxRMnNsJwiTagmyANovSBsDE8ej6yk7ZvRUADGon9fK811MQ94BJsMBEenLM1Z5D64bLY+FyL78wJs7lUazoGkwtGaKjjI8Dk5bHSQxiGlbkfveZNZfrjFigMZH9hXjDbXd4z+IZ7jyxbmsnLk8Ai9jGljwqdhyMSe1VmKAb7+rzgheq7a8td+/Om1aQFM8bE5CfkrvgRC2cPpWOHjZVv6tJm6qBZqZSSSbzcj/Q0TFxFXVohiL3qyhLAdegSFVPwwY8seUJrPVpu7N9qCoSXm6lQCy0XK9nu2T3lNSlOI2KCRV1PP4aqrDwTNw16pI9qNvHxMT+8ri3XQKfNefJoLNVn19LHrbS8hwT8WrYLvSPjknCVyIgJzF0wj2mmpaq3qN4MPGbO+zk+xGFwK7iAe5g6GZjkThXWq5FXCqjCm6463WPiAm59e5BdUrahmbcN2oITMI92/ewek96fUQCiUy4MVlyPzFu75aquFfajxsTEUu4JyWdxBl7PCSnWN27pZE//zUikVJ1aSk9JzeVEu8yQwRiSkuuLBD3SJmDCGUDxBxG4xMsEXgGFdMPRcQBEQH3x4TFm2N3U5IlZ7p4eWeobra5h08iwmMZA5/gZPxFHdl+4MjOqzABlTh2czxbFplTXBjhKHERb9mlzJZr8bDEZGYcfEKD5rzWX9bqI5jBEgPihftiwnp2hR4H6Q1dpsTa0e6d4Y+y7WFnevlkZjx8wrBE4JlRRWb2G3POgOxAPumpRY1OWIOR8rzuqt7jD7n9o1JITAgTfBQtn9e1apfZbc/5FZjwoVY7DEig+OMia+hasklJRlkiXtYnyCfgJHrCcKdWHxyMT/BTrXGnU1A/lUh1o1Fzu9irYktMJWr0w2RkfcIp+nNb/1lZ+6uzDWdAdjAmQ2waNyBRkAnxHKu4q/fYTQH+GoASihh9+USY6FH4JFByN5xwep8GNdnAfMIK7X0OjkJ0Q0YjiU/M7SawrNQmddYXkxH5RJW9Wi4+6XZXDMEnyUnsqwrPJxfNeI+YJxQ7rPFjIjZxG4c+MfPe+zBOdHsrB8ek1psZG5041kg9RR3uTpzvi8kYZEelKqR7WMdJZP0w2W+hj96bGRudRFHHc8RYl2xS7cVkZlw6Vs97IeH2zDENOzifGEPsVjoocRGIeS5ckE2YmIYFTLrvuTFhAgVPzWtgTOCT/i0fbSeRduA8ABOfLz8JTJi/u46xoN2/jDUDtMUuPej1T/h+mMwMggnHoo4HlJbEk4pufrtDH7T5xHO3h9+V5wDivkAMn5ikKNBKy7WzAvAJ0Yyy0gZqBg+NCZYIPE886R60rTgDMqz10xthMaivY38SOpZTjdSb/itLapabzWbS7cypFTwOsiWWfBmH55OS6c0wm017UCS7qqXSQhkxaEgMqnhr6BOxxYzlX32Kl8xual1igsQpv0C9KvJRqrW+NS+eGdYnN21V5j0cLex/+oh0aEzSHkwo/REWmEgKfDFxTIbZTX0IGgYTYoA+mIi+/DD1SAhGSd7pVy8eDhPO+mFilibTezEuPmFiW+vwjNO7VTg1PxZMXIP6MBl//kTQKJi0/+nGxJgjRqElbvj3s9vzTq8FtzFR5saFCYzRGNf3zvloFEwKV92Y4IJb9H+XhU3R/i+GDcWq8zGBCfaCjgMTVOpD7lI0MI2CSeWO2xbT0iwsdYg2ifJVbLJ2EEtKTFrIRGORHX2ds2PAJ9h5aJLJJUzMD7FjzS6LcZbDsCCkYNubpv3qJi4Awy9DJP1i99rQntSHwCTixoQUFn4nx5CXGZAGx4QLL8rEltkwYaLdSoF0ODemmtjFEwopSyA5q6dwac8Zza6W2/kRbEs6NCZhBxPOlsadT+rScJgwqnOHpeyw0k1clmFTkAXS4IVD2JKp5E7hCtvYJU3wCfEQYUJ9eqPKDtxKfYJfcZWXScj9yM+bKCWqKRPYiEn9mst7xz4do91CD/zWnZu4dBIssfyiTC7bY8nsMMSE9xnW31ZCizCYHLSrT5Ymt8E5H4BPuH1z4n9dxjvY61D9KTV/Ru1GRLjz48mHN2Mx2tn89Itz9hZlTjKAqid89eA+Cd7zUldAJCneofswctH9PzkGQp6eO4A2Wt5cAVFESSOVDKZqH8fmnbUquNQaMFi7+II2NE/FzpzDHbLEm6VuzggXi20cMOi6e3EEN9I0aEhJ53FU0WZxYqL7uR18aSPTFSD4T4mIFQlSG8B8o+ddbcF0SNPWTl468/LlmYsn11TNXuwaEK22ipTUg+9pzvUaMQmTnbOTNsxMrBqTkhsxxAEX597co8gphZ08G36BrPFeDJWsKpfk43eFBvGa2pqGuz2oNqPY63HLrFdj9IzqWUTTzbOphIgeb1RYj6Y7QnpFLUMLssKdFAgPX+u7JJw2UbH7BQdJi7nysZ4aOuWozXqjMN6uk6HpFbVR/NaV0rXUJeyC7PdtKGLFrmzdG8QE75+jpgb3cilXnkS/41D0Cj7BTSuMjYcvzwXB3vT72hwus63g4A70ba798vbNpZks8kqvi3C09Co+wWVX5vu/vUir0Pf5vAhIqGEgoiiDffFiPz5ZSnbPeJ30CkyCKn6he+1Xfz2J3yS0z9ZgyOamXCa4MaD97McnA+/3N2E6WHZoCyoVrdPf9H2XhONZzQ3Re7xqssHC2H6YHHqP+DHTwXxCKOBug6yZj+o9E6aEQY6+rkXJlwd2xfe3O2KPnUk588OQkfH8agenvWzM2/lM2e+wV+PLwvPN+L+D6GBy+2xYNRUx577p6PGAZAaGoGRjJW7TSnzFrkxVes+s1SoZZXkp2qxUA4FqstzONsS5c4l2rVYbZtDaiah71BP9Bw0Y4zHL0cTsoARnZpfcZPfAzyYS/qvA70twsniNv9hnw1F8d5hR+w3ac2pm/H2P/wL0et23KY2BjnZz5NdI9uaHA9D4FozTmBNdlH9UNL454DP418BkSlOa0pSmNKUpTWlKU5rSlKY0pSlNaUpTmtKUpvTvRf8PaeE6fN2OuBwAAAAASUVORK5CYII="
      alt="No courses"
      className="h-40 opacity-90"
    />
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
      You haven’t enrolled in any courses yet.
    </h2>
    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
      Browse our catalog and find something that sparks your interest. Your learning journey starts here!
    </p>
    <a
      href="/courses"
      className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow"
    >
      Explore Courses
    </a>
  </div>
);
