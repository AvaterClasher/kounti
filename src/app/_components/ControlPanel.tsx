"use client";

import { useCounterState } from "~/hooks/useCounterState";
import { BlockType } from "./Block";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Link from "next/link";

const blockTypes: Record<BlockType, string> = {
  binary: "binary",
  octal: "octal",
  decimal: "decimal",
  hexadecimal: "hexadecimal",
};

const blockDescriptions: Record<BlockType, string> = {
  binary: "Binary is a base-2 number system that uses two symbols: 0 and 1.",
  octal: "Octal is a base-8 number system that uses eight symbols: 0-7.",
  decimal: "Decimal is a base-10 number system that uses ten symbols: 0-9.",
  hexadecimal:
    "Hexadecimal is a base-16 number system that uses sixteen symbols: 0-9, A-F.",
};

export const ControlPanel = () => {
  const [counterState, setCounterState, { clearIndexes, setTheme }] =
    useCounterState();

  function handleAdd() {
    const currentIndexes = counterState.currentIndexes;
    const rangeMax = counterState.range[counterState.range.length - 1];
    const rangeMin = counterState.range[0];
    if (rangeMax == undefined || rangeMin == undefined) {
      throw new DOMException(
        "Range was improperly initialized. Could not find min and max.",
      );
    }
    adder: for (let i = 0; i < currentIndexes.length; i++) {
      switch (true) {
        case currentIndexes[i]! < rangeMax:
          currentIndexes[i] += 1;
          break adder;
        case currentIndexes[i] === rangeMax:
          currentIndexes[i] = rangeMin;
          continue adder;
        default:
          break adder;
      }
    }
    setCounterState({ currentIndexes: currentIndexes });
  }

  function handleSubtract() {
    const currentIndexes = counterState.currentIndexes;
    const rangeMax = counterState.range[counterState.range.length - 1];
    const rangeMin = counterState.range[0];
    if (rangeMax == undefined || rangeMin == undefined) {
      throw new DOMException(
        "Range was improperly initialized. Could not find min and max.",
      );
    }
    subtract: for (let i = 0; i < currentIndexes.length; i++) {
      switch (true) {
        case currentIndexes[i]! > rangeMin:
          currentIndexes[i] -= 1;
          break subtract;
        case currentIndexes[i] === rangeMin:
          currentIndexes[i] = rangeMax;
          continue subtract;
        default:
          break subtract;
      }
    }
    setCounterState({ currentIndexes: currentIndexes });
  }

  function handleBlockAdd() {
    setCounterState({
      blockCount: counterState.blockCount + 1,
      currentIndexes: [...counterState.currentIndexes, 0],
    });
  }
  function handleBlockSubtract() {
    setCounterState({
      blockCount: counterState.blockCount - 1,
      currentIndexes: counterState.currentIndexes.slice(0, -1),
    });
  }
  function handleBlockTypeChange(type: BlockType) {
    setCounterState({ blockType: type });
    clearIndexes();
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-10 flex w-[90vw] -translate-x-1/2 select-none flex-col items-start justify-center gap-6 rounded-lg p-8 font-normal text-gray-600 drop-shadow-lg backdrop-blur-[20px] dark:text-gray-400 lg:flex-row lg:items-center">
      <span className="font-semibold text-black dark:text-white lg:hidden">
        crafted by{" "}
        <Link
          target="_blank"
          className="underline"
          href={"https://soumyadipmoni.vercel.app"}
        >
          Soumyadip Moni
        </Link>{" "}
        🤖
      </span>
      <span className="text-4xl font-semibold text-black dark:text-white">
        kounti.
      </span>
      <div className="flex flex-row gap-4 lg:flex-col">
        {Object.values(blockTypes).map((blockType) => (
          <TooltipProvider key={`btn-${blockType}`}>
            <Tooltip>
              <TooltipTrigger
                className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => handleBlockTypeChange(blockType as BlockType)}
              >
                {blockType}
              </TooltipTrigger>
              <TooltipContent>
                <p>{blockDescriptions[blockType as BlockType]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="flex flex-row gap-4 lg:flex-col">
        <TooltipProvider key={`btn-add`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={handleAdd}
            >
              add +
            </TooltipTrigger>
            <TooltipContent>
              <p>Increment the counter.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-subtract`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={handleSubtract}
            >
              subtract -
            </TooltipTrigger>
            <TooltipContent>
              <p>Decrement the counter.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row gap-4 lg:flex-col">
        <TooltipProvider key={`btn-block-add`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={handleBlockAdd}
            >
              block add +
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a block.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-block-subtract`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={handleBlockSubtract}
            >
              block subtract -
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove a block.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TooltipProvider key={`btn-reset`}>
        <Tooltip>
          <TooltipTrigger
            className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={clearIndexes}
          >
            reset
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset the counter.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ul className="flex list-none flex-row gap-4 lg:flex-col">
        <TooltipProvider key={`btn-light`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setTheme("light")}
            >
              light
            </TooltipTrigger>
            <TooltipContent>
              <p>Light Theme.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-light`}>
          <Tooltip>
            <TooltipTrigger
              className="cursor-pointer duration-200 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setTheme("dark")}
            >
              dark
            </TooltipTrigger>
            <TooltipContent>
              <p>Dark Theme.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
      <span className="hidden font-semibold text-black dark:text-white lg:block">
        crafted by{" "}
        <Link
          target="_blank"
          className="underline"
          href={"https://soumyadipmoni.vercel.app"}
        >
          Soumyadip Moni
        </Link>{" "}
        🤖
      </span>
    </div>
  );
};
