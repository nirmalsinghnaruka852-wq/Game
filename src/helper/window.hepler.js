export const getsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};
export const setsize =(callback)=>{
   const Handler =()=>{
    callback({width: window.innerWidth, height: window.innerHeight})
   } 
      window.addEventListener('resize' , Handler )
   return ()=>{
     window.removeEventListener('resize' , Handler )
   }

}