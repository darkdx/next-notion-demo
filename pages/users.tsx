import React from "react";
import { InferGetServerSidePropsType } from "next";
import NotionServer from "@/lib/NotionServer";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Interview({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const res = JSON.parse(data);
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {res.map((item: any) => {
            return !!item.id && (
              <a
                href={`mailto:${item.Email}`}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
              >
                <h2 className={inter.className}>
                  {item.Name} <span>-&gt;</span>
                </h2>
                <p className={inter.className}>{item.Email}.</p>
                <p className={inter.className}>{item.Phone}.</p>
              </a>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const notionServer = new NotionServer();

  const { data } = await notionServer.query();

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
}
