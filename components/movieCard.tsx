import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MovieCard = ({
  items: initialItems,
  className,
  Rated,
}: {
  items: { id: number; Name: string; Rating: number }[];
  className?: string;
  Rated: boolean;
}) => {
  const supabase = createClient();
  const [deleteReady, setDeleteReady] = useState(false);
  const [items, setItems] = useState(initialItems);
  //makes movies removable
  useEffect(() => {
    function prepareDelete() {
      setDeleteReady(!deleteReady);
      console.log("Prepared Delete");
    }
    const removeButton = document.getElementById("remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", prepareDelete);
    }
  });

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  async function handleDelete(id: number) {
    // update UI
    setItems((prev) => prev.filter((item) => item.id !== id));

    // attemps to delete from database
    if (Rated) {
      const { error } = await supabase
        .from("moviesWatched")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
      }
    } else {
      const { error } = await supabase
        .from("movieWatchlist")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
      }
    }
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  py-10",
        className,
      )}
    >
      {items.map((item, id) => (
        <a className="relative group block p-2 h-full w-full" key={id}>
          <Card>
            <AnimatePresence>
              {deleteReady && (
                <motion.p
                  onClick={() => handleDelete(item.id)}
                  className="absolute right-2 top-2 text-right font-black text-xl hover:cursor-pointer h-5 hover:text-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  X
                </motion.p>
              )}
            </AnimatePresence>
            <MovieTitle>{item.Name}</MovieTitle>
            {Rated && <MovieRating>{item.Rating}</MovieRating>}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const MovieTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 mb-4 text-center",
        className,
      )}
    >
      {children}
    </h4>
  );
};
export const MovieRating = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm text-center",
        className,
      )}
    >
      {children}/10
    </p>
  );
};
