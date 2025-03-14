import { createFileRoute, redirect } from "@tanstack/react-router";
// import { tokenProfilesQueryOptions } from "@/api/dexscreener";
// import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  // loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(tokenProfilesQueryOptions()),
  loader: () => {
    return redirect({ to: "/pump-dot-fun", replace: true });
  },
  // component: Index,
});

// function Index() {
//   const tokenProfilesQuery = useSuspenseQuery(tokenProfilesQueryOptions());

//   console.log(tokenProfilesQuery.data);

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//         <div className="aspect-video rounded-xl bg-muted/50" />
//         <div className="aspect-video rounded-xl bg-muted/50" />
//         <div className="aspect-video rounded-xl bg-muted/50" />
//       </div>
//       <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
//     </div>
//   );
// }
