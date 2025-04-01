import Github from "@/svgs/github.svg";
import Envelope from "@/svgs/envelope.svg";

function Page() {
  return (
    <article>
      <div className="flex gap-10 mb-10 max-sm:block">
        <img
          alt="profile"
          src="/images/profile.png"
          className="object-cover w-60 h-60 rounded-[50%]"
        />
        <div className="flex flex-col py-8">
          <h3 className="text-3xl max-sm:mb-8">Yunji Kim</h3>
          <div className="mt-auto flex items-center gap-4">
            <Github
              className="fill-foreground linear-transition-colors"
              width={16}
              height={16}
            />
            <a href="https://github.com/Normaltic">Normaltic</a>
          </div>
          <div className="flex items-center gap-4">
            <Envelope
              className="fill-foreground linear-transition-colors"
              width={16}
              height={16}
            />
            <a href="mailto:normaltic@gmail.com">normaltic@gmail.com</a>
          </div>
        </div>
      </div>
      <p>프론트엔드 개발자, 김윤지입니다.</p>
    </article>
  );
}

export default Page;
