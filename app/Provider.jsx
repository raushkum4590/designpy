"use client";
import React, { Suspense, useEffect, useState } from 'react'

import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { useUser } from '@stackframe/stack';
import { api } from './../convex/_generated/api';
import { UserDetailContext } from './../context/UserDetailContext';

// Initialize the Convex client outside of the component
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Inner component that uses Convex hooks
function UserInitializer({ user, setUserDetail }) {
  const createNewUserMutation = useMutation(api.users.CreateNewUser);
  
  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [user]);
  
  const createUser = async () => {
    const data = await createNewUserMutation({
      name: user?.displayName,
      email: user?.primaryEmail,
      picture: user?.picture,
    });
    
    const result = await createNewUserMutation({
      ...data,
    });
    console.log(result);
    setUserDetail(result);
  };
  
  return null;
}

function Provider({ children }) {
  const user = useUser();
  const [userDetail, setUserDetail] = useState(null);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <ConvexProvider client={convex}>
        <UserInitializer user={user} setUserDetail={setUserDetail} />
        {children}
      </ConvexProvider>
      </UserDetailContext.Provider>
    </Suspense>
  );
}

export default Provider