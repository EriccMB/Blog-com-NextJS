import { Container } from "@/components/Container";
import { Posts } from "@/components/Posts";
import { SpinLoading } from "@/components/SpinLoading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Container>
      <h1>AFDSFSD</h1>
      <Suspense fallback={<SpinLoading />}>
        <Posts />
      </Suspense>
      <h1>AFDSFSD</h1>
    </Container>
  );
}
